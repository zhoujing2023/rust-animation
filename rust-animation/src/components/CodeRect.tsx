import { Code, CodeProps, Rect } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";
import { CodeLayout } from "./CodeLayout";
import {COLORS} from "../constants";



export interface CodeRectProps {
  // Rect 组件
  key?: string;
  rectRef?: ReferenceReceiver<Rect>;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  opacity?: number;
  // Code 组件
  code: CodeProps["code"];
  codeRef?: ReferenceReceiver<Code>;
  filename?: string;
  selection?: CodeProps["selection"];
}

/**
 * 默认代码块
 * @param 编辑参数
 * @returns Rect 组件
 */
export function CodeRect({
  key,
  rectRef,
  width = 950,
  height = 680,
  x = 0,
  y = 0,
  opacity = 0,
  code,
  codeRef,
  filename,
  selection,
}: CodeRectProps) {
  return (
    <Rect
      key={key}
      ref={rectRef}
      layout
      x={x}
      y={y}
      width={width}
      height={height}
      radius={34}
      fill={COLORS.panel}
      stroke={"#293451"}
      lineWidth={3}
      shadowColor={"#00000066"}
      shadowBlur={35}
      padding={48}
      opacity={opacity}
    >
      <CodeLayout
        code={code}
        codeRef={codeRef}
        filename={filename}
        selection={selection}
      />
    </Rect>
  );
}
