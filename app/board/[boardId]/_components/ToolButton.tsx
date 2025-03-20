"use client";
import { Hint } from "@/components/hint";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/Button";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

const ToolButton = ({
  label,
  onClick,
  icon: Icon,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <div>
        {/* @ts-ignore */}
        <Button
          onClick={onClick}
          disabled={isDisabled}
          variant={isActive ? "boardActive" : "board"}
        >
          <Icon color="black" />
        </Button>
      </div>
    </Hint>
  );
};

export default ToolButton;
