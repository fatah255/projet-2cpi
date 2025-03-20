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
} from "@liveblocks/react/suspense";
import { useState } from "react";
import { CanvasMode, CanvasState } from "@/types/canvas";
import CursorsPresence from "./CursorsPresence";

interface CanvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const name = useSelf((me) => me.info);

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

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
      <svg className="h-[100vh] w-[100vw]">
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
