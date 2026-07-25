import { Circle, Layout, Line, Txt } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";

const BG = "#0B1020";
const BLUE = "#55A7FF";
const YELLOW = "#FFD447";

export interface DoubtPictogramLayoutProps {
  key?: string;
  ref?: ReferenceReceiver<Layout>;
  x?: number;
  y?: number;
  opacity?: number;
  color?: string;
}

/**
 * 疑惑的人形 Pictogram
 * @param 参数
 * @returns
 */
export function DoubtPictogramLayout({
  key = "doubt_pictogram_layout",
  ref,
  x = 0,
  y = 0,
  color = BLUE,
  opacity = 0,
}: DoubtPictogramLayoutProps) {
  return (
    <Layout key={key} ref={ref} x={x} y={y} scale={1} opacity={opacity}>
      <Layout>
        <Circle y={-115} size={96} fill={color} />
        <Circle x={-18} y={-125} size={9} fill={BG} />
        <Circle x={18} y={-125} size={9} fill={BG} />
        <Line
          points={[
            [-18, -92],
            [0, -98],
            [18, -92],
          ]}
          stroke={BG}
          lineWidth={7}
          lineCap={"round"}
        />
        <Line
          points={[
            [0, -60],
            [0, 90],
          ]}
          stroke={color}
          lineWidth={32}
          lineCap={"round"}
        />
        <Line
          points={[
            [-68, -5],
            [0, -42],
          ]}
          stroke={color}
          lineWidth={25}
          lineCap={"round"}
        />
        <Line
          points={[
            [0, -42],
            [62, -68],
            [48, -132],
          ]}
          stroke={color}
          lineWidth={25}
          lineCap={"round"}
          lineJoin={"round"}
        />
        <Circle x={48} y={-143} size={28} fill={color} />
        <Line
          points={[
            [-55, 175],
            [0, 85],
            [55, 175],
          ]}
          stroke={color}
          lineWidth={27}
          lineCap={"round"}
        />
      </Layout>
      <Txt
        text={"?"}
        x={140}
        y={-210}
        fill={YELLOW}
        fontFamily={"JetBrains Mono, monospace"}
        fontWeight={900}
        fontSize={150}
        rotation={20}
      />
    </Layout>
  );
}
