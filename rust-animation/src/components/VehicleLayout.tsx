import { Circle, Layout, Line, Rect, Txt } from "@motion-canvas/2d";
import { ReferenceReceiver, SimpleSignal } from "@motion-canvas/core";

const TEXT = "#E8ECF6";
const MUTED = "#94A0BA";
const BLUE = "#55A7FF";

export interface VehicleLayoutProps {
  key?: string;
  layoutRef?: ReferenceReceiver<Layout>;
  size: SimpleSignal<number>;
  x?: number;
  y?: number;
  label1: string;
  label2: string;
  opacity?: number;
}

/**
 * 自行车标识
 * @param 参数
 * @returns
 */
export function VehicleLayout({
  key = "vehicle_layout",
  layoutRef,
  size,
  x = 0,
  y = 0,
  label1,
  label2,
  opacity = 0,
}: VehicleLayoutProps) {
  const scaled = (value: number) => () => value * size();

  return (
    <Layout key={key} ref={layoutRef} x={x} y={y} opacity={opacity}>
      <Circle
        x={scaled(-90)}
        y={scaled(115)}
        size={scaled(105)}
        stroke={MUTED}
        lineWidth={scaled(22)}
      />
      <Circle
        x={scaled(115)}
        y={scaled(115)}
        size={scaled(105)}
        stroke={MUTED}
        lineWidth={scaled(22)}
      />
      <Line
        points={() => [
          [-80 * size(), 95 * size()],
          [-20 * size(), 10 * size()],
          [105 * size(), 95 * size()],
          [-35 * size(), 95 * size()],
        ]}
        stroke={MUTED}
        lineWidth={scaled(28)}
        lineJoin={"round"}
      />
      <Line
        points={() => [
          [75 * size(), 70 * size()],
          [55 * size(), -75 * size()],
          [110 * size(), -75 * size()],
        ]}
        stroke={MUTED}
        lineWidth={scaled(25)}
        lineCap={"round"}
      />
      <Rect
        x={scaled(-55)}
        y={scaled(-5)}
        width={scaled(135)}
        height={scaled(40)}
        radius={scaled(25)}
        fill={BLUE}
      />
      <Txt
        text={label1}
        y={scaled(255)}
        fill={TEXT}
        fontWeight={700}
        fontSize={scaled(50)}
      />
      <Txt text={label2} y={scaled(310)} fill={MUTED} fontSize={scaled(32)} />
    </Layout>
  );
}
