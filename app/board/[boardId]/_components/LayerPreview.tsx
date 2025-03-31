"use client";
import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react";
import { memo } from "react";
import { Rectangle } from "./Rectangle";
import { Ellipse } from "./Ellipse";
import { Text } from "./Text";
import { Note } from "./Note";
import { Path } from "./Path";
import { colorToCss } from "@/lib/utils";
import { useOrganization } from "@clerk/nextjs";

interface LayerPreviewProps {
  layerId: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  //a color that indicates that the layer is selected by another user
  selectionColor: string;
}

export const LayerPreview = memo(
  ({ layerId, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    // check if the user is an admin
    const { membership } = useOrganization();
    const isAdmin = membership && membership?.role === "org:admin";
    //get the layers infos
    const layer = useStorage((root) => root.layers.get(layerId));
    if (!layer) return null;
    //if the user who selected the layer is not admin we don't want to know
    selectionColor = !isAdmin ? selectionColor : "";

    switch (layer.type) {
      case LayerType.Image:
        return (
          <image
            key={layerId}
            href={layer.src}
            x={layer.x}
            y={layer.y}
            width={layer.width}
            height={layer.height}
            onPointerDown={(e) => onLayerPointerDown(e, layerId)}
            style={{
              pointerEvents: isAdmin ? "auto" : "none",
            }}
          />
        );
      case LayerType.Path:
        return (
          <Path
            key={layerId}
            points={layer.points}
            onPointerDown={(e) => onLayerPointerDown(e, layerId)}
            x={layer.x}
            y={layer.y}
            fill={layer.fill ? colorToCss(layer.fill) : "#000"}
            stroke={selectionColor}
          />
        );
      case LayerType.Note:
        return (
          <Note
            selectionColor={selectionColor}
            id={layerId}
            layer={layer}
            onPointerDown={onLayerPointerDown}
          />
        );
      case LayerType.Text:
        return (
          <Text
            selectionColor={selectionColor}
            id={layerId}
            layer={layer}
            onPointerDown={onLayerPointerDown}
          />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={layerId}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={layerId}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      default:
        console.warn("Unknown layer type");
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
