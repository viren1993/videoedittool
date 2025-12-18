import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { dispatch } from "@designcombo/events";
import { EDIT_OBJECT } from "@designcombo/state";
import { ChevronDown, User, Lock, LockOpen, Database } from "lucide-react";
import type { FieldMetadata } from "@/utils/template-storage";

interface CustomerFieldSettingsProps {
  trackItemId: string;
  type: "text" | "image" | "video" | "audio";
  metadata?: Partial<FieldMetadata>;
}

const CUSTOMER_DATA_OPTIONS: Record<string, { value: string; label: string }[]> = {
  text: [
    { value: "customer_company_name", label: "Customer Company Name" },
    { value: "full_name", label: "Full Name" },
    { value: "city", label: "City" },
    { value: "phone_number", label: "Phone Number" },
    { value: "telephone_number", label: "Telephone Number" },
    { value: "address", label: "Address" },
    { value: "user.email", label: "User Email" },
    { value: "user.username", label: "Username" },
    { value: "company.company_name", label: "Company Name" },
    { value: "company.description", label: "Company Description" },
    { value: "company.mobile", label: "Company Mobile" },
    { value: "company.email", label: "Company Email" },
    { value: "greeting_text", label: "Greeting Text" },
    { value: "custom_text", label: "Custom Text" },
  ],
  image: [
    { value: "logo_url", label: "Logo URL" },
    { value: "company.logo_url", label: "Company Logo" },
    { value: "background_image", label: "Background Image" },
    { value: "product_image", label: "Product Image" },
  ],
  video: [
    { value: "background_video", label: "Background Video" },
    { value: "intro_video", label: "Intro Video" },
    { value: "product_video", label: "Product Video" },
  ],
  audio: [
    { value: "background_music", label: "Background Music" },
    { value: "voiceover", label: "Voiceover" },
  ],
};

function formatFieldLabel(path: string): string {
  return path
    .split(/[._]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function CustomerFieldSettings({ trackItemId, type, metadata }: CustomerFieldSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomerField, setIsCustomerField] = useState(metadata?.isCustomerField || false);
  const [fieldPath, setFieldPath] = useState(metadata?.fieldPath || "");
  const [fieldLabel, setFieldLabel] = useState(metadata?.fieldLabel || "");
  const [isLocked, setIsLocked] = useState(metadata?.isLocked || false);
  const [defaultValue, setDefaultValue] = useState(metadata?.defaultValue || "");

  useEffect(() => {
    setIsCustomerField(metadata?.isCustomerField || false);
    setFieldPath(metadata?.fieldPath || "");
    setFieldLabel(metadata?.fieldLabel || "");
    setIsLocked(metadata?.isLocked || false);
    setDefaultValue(metadata?.defaultValue || "");
  }, [trackItemId, metadata?.isCustomerField, metadata?.fieldPath, metadata?.fieldLabel, metadata?.isLocked, metadata?.defaultValue]);

  const updateMetadata = (updates: Partial<FieldMetadata>) => {
    const newMetadata: Partial<FieldMetadata> = {
      isCustomerField,
      fieldPath,
      fieldLabel,
      isLocked: isCustomerField ? false : isLocked,
      dataType: type,
      defaultValue,
      ...updates,
    };

    if (updates.isCustomerField !== undefined) {
      newMetadata.isLocked = updates.isCustomerField ? false : isLocked;
    }

    dispatch(EDIT_OBJECT, {
      payload: {
        [trackItemId]: {
          metadata: newMetadata,
        },
      },
    });
  };

  const handleCustomerFieldToggle = (checked: boolean) => {
    setIsCustomerField(checked);
    if (checked) {
      setIsLocked(false);
    }
    updateMetadata({ isCustomerField: checked, isLocked: checked ? false : isLocked });
  };

  const handleFieldPathChange = (value: string) => {
    setFieldPath(value);
    const label = formatFieldLabel(value);
    setFieldLabel(label);
    updateMetadata({ fieldPath: value, fieldLabel: label });
  };

  const handleLockedToggle = (checked: boolean) => {
    if (!isCustomerField) {
      setIsLocked(checked);
      updateMetadata({ isLocked: checked });
    }
  };

  const handleDefaultValueChange = (value: string) => {
    setDefaultValue(value);
    updateMetadata({ defaultValue: value });
  };

  const options = CUSTOMER_DATA_OPTIONS[type] || [];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between px-0 py-2 h-auto font-semibold text-xs"
        >
          <span className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Customer Field Settings
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="isCustomerField" className="text-xs flex items-center gap-2">
            <User className="h-3 w-3" />
            Customer Field
          </Label>
          <Switch
            id="isCustomerField"
            checked={isCustomerField}
            onCheckedChange={handleCustomerFieldToggle}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Field Path</Label>
          <Select value={fieldPath} onValueChange={handleFieldPathChange}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select a field..." />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Field Label</Label>
          <Input
            value={fieldLabel}
            onChange={(e) => {
              setFieldLabel(e.target.value);
              updateMetadata({ fieldLabel: e.target.value });
            }}
            placeholder="Display label..."
            className="h-8 text-xs"
          />
        </div>

        {type === "text" && (
          <div className="space-y-2">
            <Label className="text-xs">Default Value</Label>
            <Input
              value={defaultValue}
              onChange={(e) => handleDefaultValueChange(e.target.value)}
              placeholder="Default text value..."
              className="h-8 text-xs"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label htmlFor="isLocked" className="text-xs flex items-center gap-2">
            {isLocked ? (
              <Lock className="h-3 w-3 text-orange-500" />
            ) : (
              <LockOpen className="h-3 w-3" />
            )}
            Locked (Non-editable)
          </Label>
          <Switch
            id="isLocked"
            checked={isLocked}
            onCheckedChange={handleLockedToggle}
            disabled={isCustomerField}
          />
        </div>

        {isCustomerField && (
          <p className="text-xs text-muted-foreground">
            Customer fields are always editable by customers.
          </p>
        )}

        <div className="text-xs text-muted-foreground p-2 bg-muted/50 rounded">
          <p className="font-medium mb-1">Field Logic:</p>
          <ul className="list-disc list-inside space-y-1">
            <li className={isCustomerField ? "text-primary" : ""}>
              Customer Field = Always editable by customer
            </li>
            <li className={!isCustomerField && !isLocked ? "text-primary" : ""}>
              Not Customer + Not Locked = Editable
            </li>
            <li className={!isCustomerField && isLocked ? "text-primary" : ""}>
              Not Customer + Locked = Uses default only
            </li>
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
