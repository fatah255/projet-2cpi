"use client";

import Loading from "@/components/global/loading";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import {
  useHistory,
  useSelf,
  useCanRedo,
  useCanUndo,
  useMutation,
  useStorage,
  useOthersMapped,
} from "@liveblocks/react/suspense";
import React, { useCallback, useMemo, useState } from "react";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XYWH,
} from "@/types/canvas";
import { CursorsPresence } from "./CursorsPresence";
import {
  connectionIdToColor,
  pointerEventToCanvasPoint,
  resizeBounds,
  findIntersectingLayersWithRectangle,
} from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./LayerPreview";
import { SelectionBox } from "./SelectionBox";
import { SelectionTools } from "./SelectionTools";

const MAX_LAYERS = 100;

interface CanvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: CanvasProps) => {
  //to know what we are doing on the canvas
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  //to know where we are on the canvas (user view)
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  //save the last used color (by default black #000000)
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  //get the current user information
  const name = useSelf((me) => me.info);

  //to control and jump through the history of the canvas
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  //to move the camera
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  //a method to resize the selected layer
  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  //so we can select multiple layers at the same time
  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });
    }
  }, []);
  // a method to deplace the layers in the canvas
  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.translating) {
        return;
      }

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);

        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({ mode: CanvasMode.translating, current: point });
    },
    [canvasState]
  );

  //to unselect the current selected layer
  const unselectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  //to move the cursor
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      //@ts-ignore
      const current = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.translating) {
        translateSelectedLayers(current);
      } else if (canvasState.mode === CanvasMode.resizing) {
        resizeSelectedLayer(current);
      }
      setMyPresence({ cursor: current });
    },
    [canvasState, resizeSelectedLayer, camera, translateSelectedLayers]
  );

  //to start drawing
  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: lastUsedColor,
      });
    },
    [lastUsedColor]
  );

  // to know that the pointer left the layer
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      //@ts-ignore
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        return;
      }

      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }

      setCanvasState({ origin: point, mode: CanvasMode.Pressing });
    },
    [camera, canvasState.mode, setCanvasState, startDrawing]
  );

  //to remove the cursor when the pointer leaves the canvas
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);
  //so we can what layers we have to display in the canvas
  const layerIds = useStorage((root) => root.layerIds);
  // so we don't stay at the same multi selection
  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });

      const ids = findIntersectingLayersWithRectangle(
        layerIds,
        layers,
        origin,
        current
      );

      setMyPresence({ selection: ids });
    },
    [layerIds]
  );

  //add a new layer to the canvas
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },

      layerType:
        | LayerType.Ellipse
        | LayerType.Note
        | LayerType.Text
        | LayerType.Rectangle,
      position: Point
    ) => {
      //get the map of the current layers in the canvas
      const liveLayers = storage.get("layers");
      //check if we have reached the maximum number of layers
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }
      //get the list of layer ids
      const liveLayerIds = storage.get("layerIds");
      //generate a new id for the new layer
      const layerId = nanoid();
      //create a new layer object
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
      });
      //push its id to the list of layer ids
      liveLayerIds.push(layerId);
      //set the new layer in the map of layers
      liveLayers.set(layerId, layer);

      // add the changes to the history
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      //to select the added layer
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

  const onPointerUp = useMutation(
    ({}, e) => {
      //to know where the user is looking at
      const point = pointerEventToCanvasPoint(e, camera);

      if (
        canvasState.mode === CanvasMode.Pressing ||
        canvasState.mode === CanvasMode.None
      ) {
        unselectLayers();
        setCanvasState({ mode: CanvasMode.None });
      }
      //check what we are doing on the canvas
      else if (canvasState.mode === CanvasMode.Inserting) {
        //add a new layer to the canvas
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }
      // to resume the history recording
      history.resume();
    },
    [camera, canvasState, history, insertLayer, unselectLayers]
  );
  // a method to select a layer and color the border of the selected layer with the color of the user
  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      //if we insert or draw we don't want to select a layer
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();
      //@ts-ignore
      const point = pointerEventToCanvasPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
      setCanvasState({ mode: CanvasMode.translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode]
  );

  const selections = useOthersMapped((other) => other.presence.selection);
  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};
    for (const user of selections) {
      const [connectionId, selection] = user;
      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
      }
    }
    return layerIdsToColorSelection;
  }, [selections]);

  //to resize a layer
  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      setCanvasState({
        mode: CanvasMode.resizing,
        initialBounds,
        corner,
      });
    },
    [history]
  );

  return (
    <main className="w-full h-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />
      <svg
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        className="h-[100vh] w-[100vw]"
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => {
            return (
              <LayerPreview
                key={layerId}
                layerId={layerId}
                onLayerPointerDown={onLayerPointerDown}
                selectionColor={layerIdsToColorSelection[layerId]}
              />
            );
          })}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current != null && (
              <rect
                className="fill-blue-500/5 stroke-blue-500 stroke-1"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
