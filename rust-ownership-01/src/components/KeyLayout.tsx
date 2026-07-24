import {Circle, Layout, Line, Txt} from '@motion-canvas/2d';
import {SimpleSignal} from '@motion-canvas/core';

const YELLOW = '#FFD447';

export interface KeyLayoutProps {
  size: SimpleSignal<number>;
}

/**
 * 钥匙
 * @param 参数
 * @returns Layout 
 */
export function KeyLayout({size}: KeyLayoutProps) {
  const scaled = (value: number) => () => value * size();

  return (
    <Layout key={'key_layout'} y={-10}>
      <Circle
        x={scaled(-60)}
        size={scaled(70)}
        stroke={YELLOW}
        lineWidth={scaled(18)}
      />
      <Line
        points={() => [
          [-15 * size(), 0],
          [95 * size(), 0],
        ]}
        stroke={YELLOW}
        lineWidth={scaled(24)}
        lineCap={'round'}
      />
      <Line
        points={() => [
          [20 * size(), 0],
          [20 * size(), 35 * size()],
        ]}
        stroke={YELLOW}
        lineWidth={scaled(18)}
      />
      <Line
        points={() => [
          [60 * size(), 0],
          [60 * size(), 28 * size()],
        ]}
        stroke={YELLOW}
        lineWidth={scaled(18)}
      />
      <Txt
        text={'唯一的钥匙'}
        y={scaled(125)}
        fill={YELLOW}
        fontWeight={700}
        fontSize={scaled(40)}
      />
    </Layout>
  );
}
