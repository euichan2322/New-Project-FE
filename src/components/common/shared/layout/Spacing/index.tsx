import { SizeNumberType } from "@/types/css/height";
import { cn } from "@/utils/cn";
import { memo } from "react";

interface SpacingProps {
  size: SizeNumberType;
}

export default memo(function Spacing({ size }: SpacingProps) {
  return <div className={cn(`mt-${size}`)} />;
});
