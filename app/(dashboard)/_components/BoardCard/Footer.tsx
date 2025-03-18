import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  timeAgo: string;
  authorLabel: string;
  isFavorite: boolean;
  title: string;
  onClick: () => void;
  disabled: boolean;
}

const Footer = ({
  timeAgo,
  authorLabel,
  isFavorite,
  title,
  onClick,
  disabled,
}: FooterProps) => {
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)] text-gray-500">
        {title}
      </p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground-foreground truncate text-gray-400">
        {authorLabel}, {timeAgo}
      </p>
      <button
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className={cn("h-4 w-4", isFavorite && "fill-blue-600 text-blue-600")}
        />
      </button>
    </div>
  );
};

export default Footer;
