import { Button } from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/input";
import { useRenameModal } from "@/store/use-rename";
import { FormEventHandler, useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const RenameModal = () => {
  const { isOpen, onClose, initialValues } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);
  // a function to update the board title
  const update = useMutation(api.board.update);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    update({
      // @ts-ignore
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success("Board renamed");
        onClose();
      })
      .catch(() => {
        toast.error("Failed to rename the board");
      });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Board Title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for the board</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={false}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter new title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={false} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
