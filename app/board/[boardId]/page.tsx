"use client";
import React, { useRef } from "react";
import Loading from "@/components/global/loading";
import Canvas from "./_components/canvas";
import { Room } from "@/app/room";

import { Button } from "@headlessui/react";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <Room fallback={<Loading />} roomId={params.boardId}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardIdPage;
