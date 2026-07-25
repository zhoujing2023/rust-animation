import { Circle, Layout, Line, Txt } from "@motion-canvas/2d";
import { SimpleSignal } from "@motion-canvas/core";

const YELLOW = "#FFD447";

export interface KeyLayoutProps {
  key?: string;
  size: SimpleSignal<number>;
  x?: number;
  y?: number;
  label: string;
  color?: string;
  opacity?: number;
}

/**
 * 钥匙
 * @param 参数
 * @returns Layout
 */
export function KeyLayout({
  key = "key_layout",
  size,
  x = 0,
  y = 0,
  label,
  color = YELLOW,
  opacity = 0,
}: KeyLayoutProps) {
  const scaled = (value: number) => () => value * size();

  return (
    <Layout key={key} x={x} y={y} opacity={opacity}>
      <Circle
        x={scaled(-60)}
        size={scaled(70)}
        stroke={color}
        lineWidth={scaled(18)}
      />
      <Line
        points={() => [
          [-15 * size(), 0],
          [95 * size(), 0],
        ]}
        stroke={color}
        lineWidth={scaled(24)}
        lineCap={"round"}
      />
      <Line
        points={() => [
          [20 * size(), 0],
          [20 * size(), 35 * size()],
        ]}
        stroke={color}
        lineWidth={scaled(18)}
      />
      <Line
        points={() => [
          [60 * size(), 0],
          [60 * size(), 28 * size()],
        ]}
        stroke={color}
        lineWidth={scaled(18)}
      />
      <Txt
        text={label}
        y={scaled(125)}
        fill={color}
        fontWeight={700}
        fontSize={scaled(40)}
      />
    </Layout>
  );
}
