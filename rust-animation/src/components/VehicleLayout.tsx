import {Circle, Layout, Line, Rect, Txt} from '@motion-canvas/2d';
import {ReferenceReceiver, SimpleSignal} from '@motion-canvas/core';

const TEXT = '#E8ECF6';
const MUTED = '#94A0BA';
const BLUE = '#55A7FF';

export interface VehicleLayoutProps {
  layoutRef?: ReferenceReceiver<Layout>;
  size: SimpleSignal<number>;
}

/**
 * 自行车标识
 * @param 参数
 * @returns 
 */
export function VehicleLayout({layoutRef, size}: VehicleLayoutProps) {
  const scaled = (value: number) => () => value * size();

  return (
    <Layout
      key={'vehicle_layout'}
      ref={layoutRef}
      x={420}
      y={-40}
      opacity={0}
    >
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
        lineJoin={'round'}
      />
      <Line
        points={() => [
          [75 * size(), 70 * size()],
          [55 * size(), -75 * size()],
          [110 * size(), -75 * size()],
        ]}
        stroke={MUTED}
        lineWidth={scaled(25)}
        lineCap={'round'}
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
        text={'电动车'}
        y={scaled(255)}
        fill={TEXT}
        fontWeight={700}
        fontSize={scaled(50)}
      />
      <Txt
        text={'数据'}
        y={scaled(310)}
        fill={MUTED}
        fontSize={scaled(32)}
      />
    </Layout>
  );
}
