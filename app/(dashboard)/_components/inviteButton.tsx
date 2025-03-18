import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Invite Members
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[880px] max-h-[600px]">
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
};
export default InviteButton;
