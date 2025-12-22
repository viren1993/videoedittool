"use client";

import { AbsoluteFill, Img, Video, Audio, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface TrackItem {
  id: string;
  type: string;
  name: string;
  display: { from: number; to: number };
  trim?: { from: number; to: number };
  details: any;
  metadata?: any;
  playbackRate?: number;
}

interface TemplateData {
  fps: number;
  size: { width: number; height: number };
  tracks: any[];
  trackItemsMap: Record<string, TrackItem>;
  trackItemIds: string[];
}

interface Props {
  templateData: TemplateData;
}

export default function PreviewComposition({ templateData }: Props) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = (frame / fps) * 1000;

  const { trackItemsMap, size } = templateData;

  const getVisibleItems = () => {
    const items: TrackItem[] = [];
    for (const id of Object.keys(trackItemsMap)) {
      const item = trackItemsMap[id];
      if (currentTime >= item.display.from && currentTime < item.display.to) {
        items.push(item);
      }
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  const renderItem = (item: TrackItem) => {
    const { details, type, id } = item;
    
    const style: React.CSSProperties = {
      position: "absolute",
      width: details.width || "100%",
      height: details.height || "100%",
      top: details.top || 0,
      left: details.left || 0,
      transform: details.transform || "none",
      opacity: (details.opacity || 100) / 100,
      borderRadius: details.borderRadius || 0,
      visibility: details.visibility || "visible",
    };

    if (type === "text") {
      const text = details.text || "";
      // Remove {{...}} placeholders - they should be replaced by field values
      const displayText = text.replace(/\{\{[^}]+\}\}/g, "");
      
      return (
        <div
          key={id}
          style={{
            ...style,
            color: details.color || "#ffffff",
            fontSize: details.fontSize || 24,
            fontFamily: details.fontFamily || "Inter",
            fontWeight: details.fontWeight || 400,
            textAlign: details.textAlign || "left",
            display: "flex",
            alignItems: "center",
            justifyContent: details.textAlign === "center" ? "center" : "flex-start",
            wordWrap: details.wordWrap || "normal",
            width: details.width || "auto",
            height: details.height || "auto",
            padding: "0",
            margin: "0",
          }}
        >
          {displayText}
        </div>
      );
    }

    if (type === "image") {
      const src = details.src || "";
      if (!src || src.startsWith("{{") || src === "") {
        return (
          <div
            key={id}
            style={{
              ...style,
              background: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
              fontSize: 14,
            }}
          >
            [Image Placeholder]
          </div>
        );
      }
      return <Img key={id} src={src} style={style} />;
    }

    if (type === "video") {
      const src = details.src || "";
      if (!src || src.startsWith("{{") || src === "") {
        return (
          <div
            key={id}
            style={{
              ...style,
              background: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
              fontSize: 14,
            }}
          >
            [Video Placeholder]
          </div>
        );
      }
      
      const startFrom = item.trim?.from ? Math.round((item.trim.from / 1000) * fps) : 0;
      const endAt = item.trim?.to ? Math.round((item.trim.to / 1000) * fps) : undefined;
      
      return (
        <Video
          key={id}
          src={src}
          style={style}
          volume={(details.volume || 100) / 100}
          startFrom={startFrom}
          endAt={endAt}
          playbackRate={item.playbackRate || 1}
        />
      );
    }

    if (type === "audio") {
      const src = details.src || "";
      if (src.startsWith("{{")) return null;
      
      const startFrom = item.trim?.from ? Math.round((item.trim.from / 1000) * fps) : 0;
      
      return (
        <Audio
          key={id}
          src={src}
          volume={(details.volume || 100) / 100}
          startFrom={startFrom}
          playbackRate={item.playbackRate || 1}
        />
      );
    }

    return null;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {visibleItems.map(renderItem)}
    </AbsoluteFill>
  );
}

