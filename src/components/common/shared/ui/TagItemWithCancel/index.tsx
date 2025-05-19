"use client";

import X from "@/icons/X.svg";
import Text from "@shared/ui/Text";
import Image from "next/image";
import { useCallback } from "react";

interface TagItemWithCancelProps {
  text: string;
  onClickCancel?: () => void;
  onClickTag?: () => void;
}

export default function TagItemWithCancel({
  text,
  onClickCancel,
  onClickTag,
}: TagItemWithCancelProps) {
  const onCLickCancelButton = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!onClickCancel) return;
      onClickCancel();
    },
    [onClickCancel]
  );
  return (
    <div
      className="border border-gray-200 rounded-full pl-4 pr-3 py-1 text-xs"
      typeof="button"
      onClick={onClickTag}
    >
      <Text fontSize="text-xs">{text}</Text>
      <button onClick={onCLickCancelButton} className="ml-1">
        <Image src={X} alt="태그 제거" />
      </button>
    </div>
  );
}
