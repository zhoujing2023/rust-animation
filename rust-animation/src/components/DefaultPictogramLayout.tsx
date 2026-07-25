import { Circle, Layout, Line, Txt } from "@motion-canvas/2d";
import { ReferenceReceiver, SimpleSignal } from "@motion-canvas/core";

const TEXT = "#E8ECF6";
const BLUE = "#55A7FF";

export interface DefaultPictogramLayoutProps {
  key?: string;
  layoutRef?: ReferenceReceiver<Layout>;
  size: SimpleSignal<number>;
  x?: number;
  y?: number;
  label1: string;
  label2: string;
  color?: string;
  opacity?: number;
}

/**
 * 默认人形标识
 * @param 参数
 * @returns Layout
 */
export function DefaultPictogramLayout({
  key = "figure_layout",
  layoutRef,
  size,
  x = 0,
  y = 0,
  label1,
  label2,
  color = BLUE,
  opacity = 0,
}: DefaultPictogramLayoutProps) {
  const scaled = (value: number) => () => value * size();

  return (
    <Layout key={key} ref={layoutRef} x={x} y={y} opacity={opacity}>
      <Circle y={scaled(-135)} size={scaled(110)} fill={color} />
      <Line
        points={() => [
          [0, -75 * size()],
          [0, 100 * size()],
        ]}
        stroke={color}
        lineWidth={scaled(36)}
        lineCap={"round"}
      />
      <Line
        points={() => [
          [-75 * size(), -5 * size()],
          [0, -50 * size()],
          [75 * size(), -5 * size()],
        ]}
        stroke={color}
        lineWidth={scaled(28)}
        lineCap={"round"}
      />
      <Line
        points={() => [
          [-60 * size(), 195 * size()],
          [0, 95 * size()],
          [60 * size(), 195 * size()],
        ]}
        stroke={color}
        lineWidth={scaled(30)}
        lineCap={"round"}
      />
      <Txt
        text={label1}
        y={scaled(275)}
        fill={color}
        fontWeight={700}
        fontSize={scaled(50)}
      />
      <Txt text={label2} y={scaled(330)} fill={color} fontSize={scaled(32)} />
    </Layout>
  );
}
