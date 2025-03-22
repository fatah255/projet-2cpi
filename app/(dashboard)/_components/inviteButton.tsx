import { Plus, Settings2 } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Settings2 />
          Manage Organization
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[880px] max-h-[600px]">
        <OrganizationProfile routing="hash" />
      </DialogContent>
    </Dialog>
  );
};
export default InviteButton;
