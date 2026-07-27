import { Layout, Rect, Txt } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";
import { COLORS } from "../constants";

export interface DataRect1Props {
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
  label1?: [string, number, string]; // 内容，字体大小，颜色
  label2?: [string, number, string];
  label3?: [string, number, string];
  opacity?: number;
}

/**
 * 数据 Rect1
 * @param 参数
 * @returns
 */
export function DataRect1({
  key,
  ref,
  x = 0,
  y = 0,
  width = 400,
  height = 300,
  radius = 30,
  fill = "#172B45",
  stroke = COLORS.blue,
  lineWidth = 5,
  shadowColor = "#5178e533",
  shadowBlur = 30,
  label1,
  label2,
  label3,
  opacity = 0,
}: DataRect1Props) {
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
      <Layout layout direction={"column"} alignItems={"center"} gap={20}>
        <Txt
          text={label1?.[0]}
          fill={label1?.[2]}
          fontFamily={"JetBrains Mono, monospace"}
          fontSize={label1?.[1]}
        />
        <Txt
          text={label2?.[0]}
          fill={label2?.[2]}
          fontWeight={700}
          fontSize={label2?.[1]}
        />
        <Txt text={label3?.[0]} fill={label3?.[2]} fontSize={label3?.[1]} />
      </Layout>
    </Rect>
  );
}
