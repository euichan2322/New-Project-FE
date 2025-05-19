import { cn } from "@/utils/cn";

interface TextProps {
  children: React.ReactNode;
  className?: string;
  color?: ColorType;
  fontSize?: SizeType;
  fontWeight?: WeightType;
  display?: "block" | "inline";
  zIndex?:
    | "z-0"
    | "z-10"
    | "z-20"
    | "z-30"
    | "z-40"
    | "z-50"
    | "-z-10"
    | "-z-20"
    | "-z-30"
    | "-z-40"
    | "-z-50";
}
//TODO: text 뺴기

type ColorType =
  | "text-main-green"
  | "text-sub-gray"
  | "text-white"
  | "text-black"
  | "text-error-message";

//TODO: 숫자로 크기 다룰 수 있게 하기
type SizeType =
  | "text-xs"
  | "text-sm"
  | "text-base"
  | "text-xl"
  | "text-xl"
  | "text-2xl"
  | "text-3xl"
  | "text-4xl"
  | "text-6xl"
  | "text-7xl";

type WeightType =
  | "font-thin"
  | "font-extralight"
  | "font-light"
  | "font-normal"
  | "font-medium"
  | "font-semibold"
  | "font-bold"
  | "font-extrabold"
  | "font-black";

export default function Text({
  children,
  className,
  color = "text-black",
  fontSize = "text-base",
  fontWeight = "font-normal",
  display = "inline",
  zIndex,
}: TextProps) {
  return (
    <span
      className={cn(color, fontSize, fontWeight, className, display, zIndex)}
    >
      {children}
    </span>
  );
}
