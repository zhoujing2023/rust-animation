import { Rect, Txt } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";
import { COLORS } from "../constants";


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
  contentRectRef?: ReferenceReceiver<Rect>;
  invalidTxtRef?: ReferenceReceiver<Txt>;
  invalidShowTxt?: string;
}

/**
 * 数据 Rect2
 * 
 * 失效动画：
 *  invalidTxtRef().scale(0);
 *  yield* all(
 *    contentRecttRef().opacity(0.3, 0.3),
 *    invalidTxtRef().opacity(1, 0.3),
 *    invalidTxtRef().scale(1, 0.5, easeOutBack),
 *  );
 *
 * @param 参数
 * @returns
 */
export function DataRect2({
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
  shadowColor,
  shadowBlur,
  label,
  opacity = 0,
  contentRectRef,
  invalidTxtRef,
  invalidShowTxt,
}: DataRect2Props) {
  return (
    <Rect key={key} ref={ref} x={x} y={y} opacity={opacity}>
      <Rect
        ref={contentRectRef}
        width={width}
        height={height}
        fill={fill}
        radius={radius}
        stroke={stroke}
        lineWidth={lineWidth}
        shadowColor={shadowColor}
        shadowBlur={shadowBlur}
        opacity={1}
      >
        <Txt
          text={label?.[0]}
          fill={label?.[2]}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={700}
          fontSize={label?.[1]}
        />
      </Rect>
      <Txt
        ref={invalidTxtRef}
        text={invalidShowTxt}
        fill={COLORS.muted}
        fontFamily={"JetBrains Mono, monospace"}
        fontWeight={800}
        fontSize={60}
        opacity={0}
      />
    </Rect>
  );
}
