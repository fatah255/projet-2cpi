import Link from "next/link";
import Image from "next/image";
import Overlay from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/Skeleton";
import Footer from "./Footer";
import Actions from "@/components/global/actions";
import { MoreHorizontal } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";

interface BoardCardProps {
  title: string;
  id: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();

  //to check the owner of the board
  const authorLabel = userId === authorId ? "You" : authorName;
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

  const onFavorite = useMutation(api.board.favorite);
  const onUnfavorite = useMutation(api.board.unfavorite);
  const toggleFavorite = () => {
    if (isFavorite) {
      //@ts-ignore
      onUnfavorite({ id }).catch(() => toast.error("Failed to unfavorite"));
    } else {
      //@ts-ignore
      onFavorite({ id, orgId }).catch(() => toast.error("Failed to favorite"));
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} fill alt={title} className="object-fit" />
          {/* for the hovering effect */}
          <Overlay />
          {/* for the operations on the board */}
          <Actions id={id} title={title}>
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        {/* showing the board information */}
        <Footer
          timeAgo={timeAgo}
          authorLabel={authorLabel}
          isFavorite={isFavorite}
          title={title}
          onClick={toggleFavorite}
          disabled={false}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default BoardCard;
