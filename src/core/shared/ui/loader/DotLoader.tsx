import type {CSSProperties} from "react";
import {cn} from "../../lib/utils";
import "./DotLoader.css";

type DotLoaderProps = {
  className?: string;
  style?: CSSProperties;
  color?: string;
  size?: number | string;
  width?: number | string;
  offset?: number | string;
  stroke?: number | string;
  durationMs?: number;
};

const toCssSize = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

export const DotLoader = ({
  className,
  style,
  color,
  size,
  width,
  offset,
  stroke,
  durationMs,
}: DotLoaderProps) => {
  const resolvedSize = width ?? size;
  const mergedStyle = {
    ...(resolvedSize
      ? {"--dot-loader-size": toCssSize(resolvedSize)}
      : undefined),
    ...(offset ? {"--dot-loader-offset": toCssSize(offset)} : undefined),
    ...(stroke ? {"--dot-loader-stroke": toCssSize(stroke)} : undefined),
    ...(color ? {"--dot-loader-color": color} : undefined),
    ...(durationMs
      ? {
          "--dot-loader-duration": `${durationMs}ms`,
          "--dot-loader-delay": `-${durationMs / 2}ms`,
        }
      : undefined),
    ...style,
  } as CSSProperties;

  return <div className={cn("loader", className)} style={mergedStyle} />;
};
