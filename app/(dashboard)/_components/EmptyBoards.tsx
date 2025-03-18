"use client";

import Image from "next/image";
import { Button } from "../../../components/ui/Button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";

//a component that renders in the case of empty boards
const EmptyBoards = () => {
  //getting the create mutation that we define in the api endpoint
  //this mutation is used to create a new board
  const { organization } = useOrganization();
  const create = useMutation(api.board.create);
  const onClick = () => {
    if (!organization) return;
    //calling the create mutation to create a new board
    create({
      title: "Untitled",
      orgId: organization.id!,
    }) //showing a success toast if the board is created successfully
      .then((id) => {
        toast.success("Board created");
        //redirecting to the newly created board
      }) //showing an error toast if the board creation fails
      .catch(() => {
        toast.error("Failed to create");
      });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" width={140} height={140} alt="empty" />
      <h2 className="text-2xl font-semibold mt-6 text-blue-800">
        Create Your First Board
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button size="lg" onClick={onClick}>
          Create Board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
