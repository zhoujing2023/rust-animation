import { Rect, Txt } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";

const BLUE = "#55A7FF";

export interface DataRect2Props {
  key?: string;
  ref?: ReferenceReceiver<Rect>;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  lineWidth?: number;
  shadowColor?: string;
  shadowBlur?: number;
  radius?: number;
  label?: [string, number, string]; // 内容，字体大小，颜色
  opacity?: number;
}

/**
 * 数据 Rect2
 * @param 参数
 * @returns
 */
export function DataRect2({
  key = "data_rect_2",
  ref,
  x = 0,
  y = 0,
  width = 400,
  height = 300,
  radius = 30,
  fill = "#172B45",
  stroke = BLUE,
  lineWidth = 5,
  shadowColor,
  shadowBlur,
  label,
  opacity = 0,
}: DataRect2Props) {
  return (
    <Rect
      key={key}
      ref={ref}
      x={x}
      y={y}
      width={width}
      height={height}
      radius={radius}
      fill={fill}
      stroke={stroke}
      lineWidth={lineWidth}
      shadowColor={shadowColor}
      shadowBlur={shadowBlur}
      opacity={opacity}
    >
      <Txt
        text={label?.[0]}
        fill={label?.[2]}
        fontFamily={"JetBrains Mono, monospace"}
        fontWeight={700}
        fontSize={label?.[1]}
      />
    </Rect>
  );
}
