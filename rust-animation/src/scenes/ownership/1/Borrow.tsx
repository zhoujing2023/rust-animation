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
import { DottedLine } from "../../../components/DottedLine";

const BG = "#0B1020";
const PANEL = "#151C31";
const TEXT = "#E8ECF6";
const BLUE = "#55A7FF";
const RED = "#FF5C68";
const YELLOW = "#FFD447";

function Person({ name, color }: { name: string; color: string }) {
  return (
    <Layout>
      <Circle y={-115} size={96} fill={color} />
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
          [68, -5],
        ]}
        stroke={color}
        lineWidth={25}
        lineCap={"round"}
      />
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
      <Txt text={name} y={245} fill={TEXT} fontWeight={700} fontSize={45} />
    </Layout>
  );
}

export default makeScene2D(function* (view) {
  view.fill(BG);

  const key = createRef<Layout>();
  const ownerLink = createRef<Line>();
  const prompt = createRef<Layout>();
  const choices = createRef<Layout>();
  const borrowChoice = createRef<Rect>();
  const moveChoice = createRef<Rect>();
  const borrowTxt = createRef<Txt>();

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
          text={"如果只是临时用一下呢？"}
          fill={TEXT}
          fontWeight={800}
          fontSize={58}
        />
      </Layout>

      <Layout x={-300} y={-230} scale={0.9}>
        <Person name={"小明"} color={BLUE} />
      </Layout>
      <Layout x={300} y={-230} scale={0.9}>
        <Person name={"张三"} color={RED} />
      </Layout>

      <Txt
        ref={borrowTxt}
        text={"借用"}
        x={120}
        y={-280}
        fill={BLUE}
        fontSize={30}
        opacity={0}
      />

      <DottedLine
        ref={ownerLink}
        points={[
          [200, -230],
          [-40, -230],
        ]}
        stroke={BLUE}
        lineWidth={8}
        arrowSize={22}
        end={0}
        lineDash={[20, 15]}
      ></DottedLine>

      <Layout ref={key} x={-140} y={-230} scale={0.82}>
        <Circle x={-55} size={66} stroke={YELLOW} lineWidth={17} />
        <Line
          points={[
            [-12, 0],
            [90, 0],
          ]}
          stroke={YELLOW}
          lineWidth={22}
          lineCap={"round"}
        />
        <Line
          points={[
            [25, 0],
            [25, 32],
          ]}
          stroke={YELLOW}
          lineWidth={16}
        />
        <Line
          points={[
            [61, 0],
            [61, 25],
          ]}
          stroke={YELLOW}
          lineWidth={16}
        />
      </Layout>

      <Layout
        ref={choices}
        layout
        direction={"column"}
        y={380}
        gap={40}
        opacity={0}
      >
        <Rect
          ref={moveChoice}
          width={880}
          height={150}
          radius={28}
          fill={PANEL}
          stroke={"#34405C"}
          lineWidth={3}
        >
          <Layout layout alignItems={"center"} padding={[0, 42]} gap={28}>
            <Txt
              text={"直接交出去"}
              fill={TEXT}
              fontWeight={700}
              fontSize={39}
            />
            <Txt
              text={"Move"}
              fill={YELLOW}
              fontFamily={"JetBrains Mono, monospace"}
              fontWeight={800}
              fontSize={43}
            />
          </Layout>
        </Rect>
        <Rect
          ref={borrowChoice}
          width={880}
          height={150}
          radius={28}
          fill={"#172B45"}
          stroke={BLUE}
          lineWidth={4}
        >
          <Layout layout alignItems={"center"} padding={[0, 42]} gap={28}>
            <Txt text={"临时使用"} fill={TEXT} fontWeight={700} fontSize={39} />
            <Txt
              text={"&"}
              fill={BLUE}
              fontFamily={"JetBrains Mono, monospace"}
              fontWeight={900}
              fontSize={54}
            />
          </Layout>
        </Rect>
      </Layout>
    </>,
  );

  yield* prompt().opacity(1, 0.45);

  yield* waitUntil("scene5_return_key");
  yield* all(
    borrowTxt().opacity(1, 0.4),
    ownerLink().end(1, 0.6, easeInOutCubic),
  );

  yield* waitUntil("scene5_show_choices");
  yield* choices().opacity(1, 0.45);

  yield* waitUntil("scene5_choose_temporary");
  yield* all(
    moveChoice().opacity(0.35, 0.35),
    borrowChoice().scale(1.08, 0.55, easeOutBack),
    borrowChoice().shadowColor("#55A7FF66", 0.4),
    borrowChoice().shadowBlur(35, 0.4),
  );

  yield* waitUntil("scene5_end");
});
