import {Circle, Layout, Line, Txt} from '@motion-canvas/2d';
import {ReferenceReceiver, SimpleSignal} from '@motion-canvas/core';

const TEXT = '#E8ECF6';
const BLUE = '#55A7FF';

export interface FigureLayoutProps {
  layoutRef?: ReferenceReceiver<Layout>;
  size: SimpleSignal<number>;
}

/**
 * 人性标识
 * @param 参数
 * @returns Layout 
 */
export function FigureLayout({layoutRef, size}: FigureLayoutProps) {
  const scaled = (value: number) => () => value * size();

  return (
    <Layout
      key={'figure_layout'}
      ref={layoutRef}
      x={-400}
      y={-30}
      opacity={0}
    >
      <Circle y={scaled(-135)} size={scaled(110)} fill={BLUE} />
      <Line
        points={() => [
          [0, -75 * size()],
          [0, 100 * size()],
        ]}
        stroke={BLUE}
        lineWidth={scaled(36)}
        lineCap={'round'}
      />
      <Line
        points={() => [
          [-75 * size(), -5 * size()],
          [0, -50 * size()],
          [75 * size(), -5 * size()],
        ]}
        stroke={BLUE}
        lineWidth={scaled(28)}
        lineCap={'round'}
      />
      <Line
        points={() => [
          [-60 * size(), 195 * size()],
          [0, 95 * size()],
          [60 * size(), 195 * size()],
        ]}
        stroke={BLUE}
        lineWidth={scaled(30)}
        lineCap={'round'}
      />
      <Txt
        text={'小明'}
        y={scaled(275)}
        fill={TEXT}
        fontWeight={700}
        fontSize={scaled(50)}
      />
      <Txt
        text={'所有者'}
        y={scaled(330)}
        fill={BLUE}
        fontSize={scaled(32)}
      />
    </Layout>
  );
}
