import {
  Circle,
  Layout,
  Line,
  Rect,
  Txt,
  makeScene2D,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  easeInOutCubic,
  easeOutBack,
  waitUntil,
} from "@motion-canvas/core";

const BG = "#0B1020";
const PANEL = "#151C31";
const TEXT = "#E8ECF6";
const MUTED = "#94A0BA";
const BLUE = "#55A7FF";
const RED = "#FF5C68";
const YELLOW = "#FFD447";

function ConfusedPerson({color}: {color: string}) {
  return (
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
  );
}

export default makeScene2D(function* (view) {
  view.fill(BG);

  const prompt = createRef<Layout>();
  const person = createRef<Layout>();
  const question = createRef<Txt>();

  view.add(
    <>
      <Layout
        ref={prompt}
        layout
        direction={"column"}
        alignItems={"center"}
        y={-700}
        gap={14}
        opacity={0}
      >
        <Txt
          text={"Rust 为什么要这样设计？"}
          fill={TEXT}
          fontWeight={800}
          fontSize={58}
        />
      </Layout>

      <Layout key="confuse_figure_layout" ref={person} x={-35} y={-40} scale={1} opacity={0}>
        <ConfusedPerson color={BLUE} />
      </Layout>
      <Txt
        ref={question}
        text={"?"}
        x={140}
        y={-210}
        fill={YELLOW}
        fontFamily={"JetBrains Mono, monospace"}
        fontWeight={900}
        fontSize={150}
        opacity={0}
        scale={0.8}
        rotation={20}
      />

    </>,
  );

  yield* prompt().opacity(1, 0.2);
  yield* all(
    person().opacity(1, 0.35),
    person().scale(1, 0.55, easeOutBack),
    question().opacity(1, 0.3),
    question().scale(1, 0.55, easeOutBack),
  );

  yield* waitUntil("scene8_end");
});
