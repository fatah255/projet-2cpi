"use client";
import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react";
import { memo } from "react";
import { Rectangle } from "./Rectangle";
import { Ellipse } from "./Ellipse";
import { Text } from "./Text";

interface LayerPreviewProps {
  layerId: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  //a color that indicates that the layer is selected by another user
  selectionColor: string;
}

export const LayerPreview = memo(
  ({ layerId, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(layerId));
    if (!layer) return null;

    switch (layer.type) {
      case LayerType.Text:
        return (
          <Text id={layerId} layer={layer} onPointerDown={onLayerPointerDown} />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={layerId}
            layer={layer}
            onPointerDown={onLayerPointerDown}
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
        console.warn("Unknown layer type", layer.type);
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
