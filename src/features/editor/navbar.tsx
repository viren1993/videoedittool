import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { dispatch } from "@designcombo/events";
import { HISTORY_UNDO, HISTORY_REDO, DESIGN_RESIZE } from "@designcombo/state";
import { Icons } from "@/components/shared/icons";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronDown,
  Download,
  ProportionsIcon,
  Save,
  LayoutGrid,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import type StateManager from "@designcombo/state";
import { generateId } from "@designcombo/timeline";
import type { IDesign } from "@designcombo/types";
import { useDownloadState } from "./store/use-download-state";
import DownloadProgressModal from "./download-progress-modal";
import AutosizeInput from "@/components/ui/autosize-input";
import { debounce } from "lodash";
import {
  useIsLargeScreen,
  useIsMediumScreen,
  useIsSmallScreen,
} from "@/hooks/use-media-query";

import Link from "next/link";
import { extractFieldsFromMetadata } from "@/utils/template-storage";
import { toast } from "sonner";
import { categories } from "@/data/categories";
import { transformToTemplateFormat } from "@/utils/template-api";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTemplateStore } from "@/store/use-template-store";

export default function Navbar({
  user,
  stateManager,
  setProjectName,
  projectName,
  tempId,
}: {
  user: any | null;
  stateManager: StateManager;
  setProjectName: (name: string) => void;
  projectName: string;
  tempId?: string;
}) {
  const [title, setTitle] = useState(projectName);
  const [isSaving, setIsSaving] = useState(false);
  const isLargeScreen = useIsLargeScreen();
  const isSmallScreen = useIsSmallScreen();
  const router = useRouter();
  const { data: session } = useSession();
  const { saveTemplate } = useTemplateStore();

  const handleUndo = () => {
    dispatch(HISTORY_UNDO);
  };

  const handleRedo = () => {
    dispatch(HISTORY_REDO);
  };

  // const handleCreateProject = async () => {};

  const debouncedSetProjectName = useCallback(
    debounce((name: string) => {
      console.log("Debounced setProjectName:", name);
      setProjectName(name);
    }, 2000), // 2 seconds delay
    []
  );

  useEffect(() => {
    debouncedSetProjectName(title);
  }, [title, debouncedSetProjectName]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const [category, setCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const getAspectRatioLabel = (width: number, height: number): string => {
    const ratio = width / height;
    if (Math.abs(ratio - 16 / 9) < 0.1) return "16:9";
    if (Math.abs(ratio - 9 / 16) < 0.1) return "9:16";
    if (Math.abs(ratio - 1) < 0.1) return "1:1";
    if (Math.abs(ratio - 4 / 5) < 0.1) return "4:5";
    return `${width}x${height}`;
  };
  const handleSave = async () => {
    if (isSaving) return;

    const accessToken = session?.user?.access_token;
    if (!accessToken) {
      toast.error("Authentication required", {
        description: "Please sign in to save templates",
      });
      return;
    }

    setIsSaving(true);
    try {
      const data = {
        id: generateId(),
        ...stateManager.toJSON(),
      };

      const fields = extractFieldsFromMetadata(data);
      const customerFields = fields.filter((f) => f.metadata.isCustomerField);
      const size = data.size || { width: 1080, height: 1920 };
      const aspectRatio = getAspectRatioLabel(size.width, size.height);

      // Transform to new template format and upload media
      const templatePayload = await transformToTemplateFormat(
        data,
        projectName || "Untitled Template",
        accessToken,
        category || undefined
      );

      // Save to API using Zustand store
      const savedTemplate = await saveTemplate(
        templatePayload,
        accessToken,
        !!tempId,
        tempId
      );

      if (savedTemplate) {
        toast.success("Template saved successfully!", {
          description: `${savedTemplate.name} with ${customerFields.length} customer fields`,
        });

        // Redirect to templates page after successful save
        router.push("/templates");
      } else {
        toast.error("Failed to save template");
      }
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error("Failed to save template", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isLargeScreen ? "320px 1fr 320px" : "1fr 1fr 1fr",
      }}
      className="bg-muted pointer-events-none flex h-11 items-center border-b border-border/80 px-2"
    >
      <DownloadProgressModal />
      <div className="flex items-center gap-2">
        <div className=" pointer-events-auto flex h-10 items-center px-1.5">
          <Button
            onClick={handleUndo}
            className="text-muted-foreground"
            variant="ghost"
            size="icon"
          >
            <Icons.undo width={20} />
          </Button>
          <Button
            onClick={handleRedo}
            className="text-muted-foreground"
            variant="ghost"
            size="icon"
          >
            <Icons.redo width={20} />
          </Button>
        </div>
      </div>

      <div className="flex h-11 items-center justify-center gap-2">
        {/* {!isSmallScreen && ( */}
        <div className=" pointer-events-auto flex h-10 items-center gap-2 rounded-md px-2.5 text-muted-foreground">
          <AutosizeInput
            name="title"
            value={title}
            onChange={handleTitleChange}
            width={200}
            inputClassName="border-none outline-none px-1 bg-background text-sm font-medium text-zinc-200"
          />
        </div>
        {/* )} */}
      </div>
      <div className="flex h-11 items-center justify-end gap-2">
        <div className=" pointer-events-auto flex h-10 items-center gap-2 rounded-md px-2.5">
          <Popover open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
            <PopoverTrigger asChild>
              <Button
                className="flex h-7 gap-1 border border-border"
                variant="outline"
              >
                <div>{category || "Select a category"}</div>
                <ChevronDown width={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-background z-[251] w-[--radix-popover-trigger-width] px-2 py-2 overflow-y-auto max-h-60">
              <div
                className="flex h-7 items-center rounded-sm px-3 text-sm hover:cursor-pointer hover:bg-zinc-800 overflow-auto"
                onClick={() => {
                  setCategory("");
                  setIsCategoryOpen(false);
                }}
              >
                None
              </div>
              {categories.map((cat) => (
                <div
                  key={cat.key}
                  className="flex h-7 items-center rounded-sm px-3 text-sm hover:cursor-pointer hover:bg-zinc-800"
                  onClick={() => {
                    setCategory(cat.label);
                    setIsCategoryOpen(false);
                  }}
                >
                  {cat.label}
                </div>
              ))}
            </PopoverContent>
          </Popover>
          <ResizeVideo />
          <Link href="/company/templates">
            <Button
              className="h-7 gap-1 border border-border"
              variant="outline"
              size="sm"
            >
              <LayoutGrid width={18} />
              <span className="hidden md:block">Templates</span>
            </Button>
          </Link>
          <Button
            className="flex h-7 gap-1 border border-border"
            variant="outline"
            size={isSmallScreen ? "icon" : "sm"}
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save width={18} />
            <span className="hidden md:block">
              {isSaving ? "Saving..." : "Save"}
            </span>
          </Button>
          <DownloadPopover stateManager={stateManager} />
        </div>
      </div>
    </div>
  );
}

const DownloadPopover = ({ stateManager }: { stateManager: StateManager }) => {
  const isMediumScreen = useIsMediumScreen();
  const { actions, exportType } = useDownloadState();
  const [isExportTypeOpen, setIsExportTypeOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleExport = () => {
    const data: IDesign = {
      id: generateId(),
      ...stateManager.toJSON(),
    };

    console.log({ data });
    actions.setState({ payload: data });
    actions.startExport();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="flex h-7 gap-1 border border-border"
          size={isMediumScreen ? "sm" : "icon"}
        >
          <Download width={18} />{" "}
          <span className="hidden md:block">Export</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="bg-sidebar z-[250] flex w-60 flex-col gap-4"
      >
        <Label>Export settings</Label>

        <Popover open={isExportTypeOpen} onOpenChange={setIsExportTypeOpen}>
          <PopoverTrigger asChild>
            <Button className="w-full justify-between" variant="outline">
              <div>{exportType.toUpperCase()}</div>
              <ChevronDown width={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-background z-[251] w-[--radix-popover-trigger-width] px-2 py-2">
            <div
              className="flex h-7 items-center rounded-sm px-3 text-sm hover:cursor-pointer hover:bg-zinc-800"
              onClick={() => {
                actions.setExportType("mp4");
                setIsExportTypeOpen(false);
              }}
            >
              MP4
            </div>
            <div
              className="flex h-7 items-center rounded-sm px-3 text-sm hover:cursor-pointer hover:bg-zinc-800"
              onClick={() => {
                actions.setExportType("json");
                setIsExportTypeOpen(false);
              }}
            >
              JSON
            </div>
          </PopoverContent>
        </Popover>

        <div>
          <Button onClick={handleExport} className="w-full">
            Export
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface ResizeOptionProps {
  label: string;
  icon: string;
  value: ResizeValue;
  description: string;
}

interface ResizeValue {
  width: number;
  height: number;
  name: string;
}

const RESIZE_OPTIONS: ResizeOptionProps[] = [
  {
    label: "16:9",
    icon: "landscape",
    description: "YouTube ads",
    value: {
      width: 1920,
      height: 1080,
      name: "16:9",
    },
  },
  {
    label: "9:16",
    icon: "portrait",
    description: "TikTok, YouTube Shorts",
    value: {
      width: 1080,
      height: 1920,
      name: "9:16",
    },
  },
  {
    label: "1:1",
    icon: "square",
    description: "Instagram, Facebook posts",
    value: {
      width: 1080,
      height: 1080,
      name: "1:1",
    },
  },
  {
    label: "4:5",
    icon: "portrait",
    description: "Instagram & Facebook feed",
    value: {
      width: 1080,
      height: 1350,
      name: "4:5",
    },
  },
];

const ResizeVideo = () => {
  const [customWidth, setCustomWidth] = useState(1080);
  const [customHeight, setCustomHeight] = useState(1920);
  const handleResize = (options: ResizeValue) => {
    dispatch(DESIGN_RESIZE, {
      payload: {
        ...options,
      },
    });
  };

  const handleCustomResize = () => {
    dispatch(DESIGN_RESIZE, {
      payload: {
        width: customWidth,
        height: customHeight,
        name: `${customWidth}x${customHeight}`,
      },
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="z-10 h-7 gap-2" variant="outline" size={"sm"}>
          <ProportionsIcon className="h-4 w-4" />
          <div>Resize</div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[250] w-60 px-2.5 py-3">
        <div className="text-sm space-y-2">
          {RESIZE_OPTIONS.map((option, index) => (
            <ResizeOption
              key={index}
              label={option.label}
              icon={option.icon}
              value={option.value}
              handleResize={handleResize}
              description={option.description}
            />
          ))}
          <div className="my-2 h-px bg-border/50" />
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Custom size</div>

            <div className="flex gap-2">
              <Input
                type="number"
                value={customWidth}
                onChange={(e) => setCustomWidth(Number(e.target.value))}
                placeholder="Width"
              />
              <Input
                type="number"
                value={customHeight}
                onChange={(e) => setCustomHeight(Number(e.target.value))}
                placeholder="Height"
              />
            </div>
            <PopoverClose asChild>
              <Button
                onClick={handleCustomResize}
                className="h-7 w-full"
                variant="secondary"
              >
                Apply
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const ResizeOption = ({
  label,
  icon,
  value,
  description,
  handleResize,
}: ResizeOptionProps & { handleResize: (payload: ResizeValue) => void }) => {
  const Icon = Icons[icon as "text"];
  return (
    <div
      onClick={() => handleResize(value)}
      className="flex cursor-pointer items-center rounded-md p-2 hover:bg-zinc-50/10"
    >
      <div className="w-8 text-muted-foreground">
        <Icon size={20} />
      </div>
      <div>
        <div>{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};
