import {
  Circle,
  Layout,
  Line,
  Rect,
  Txt,
  makeScene2D,
} from "@motion-canvas/2d";
import { all, createRef, easeOutBack, waitUntil } from "@motion-canvas/core";

const BG = "#0B1020";
const PANEL = "#151C31";
const TEXT = "#E8ECF6";
const MUTED = "#94A0BA";
const BLUE = "#55A7FF";
const RED = "#FF5C68";
const YELLOW = "#FFD447";

export default makeScene2D(function* (view) {
  view.fill(BG);

  const title = createRef<Layout>();
  const divider = createRef<Line>();
  const moveCard = createRef<Rect>();
  const borrowCard = createRef<Rect>();
  const moveRelation = createRef<Line>();
  const borrowRelation = createRef<Line>();
  const moveResult = createRef<Rect>();
  const borrowResult = createRef<Rect>();
  const summary = createRef<Txt>();

  view.add(
    <>
      <Layout
        ref={title}
        layout
        direction={"column"}
        alignItems={"center"}
        y={-725}
        gap={12}
        opacity={0}
      >
        <Layout layout alignItems={"center"} padding={[0, 42]} gap={20}>
          <Txt
            text={"Move"}
            fill={YELLOW}
            fontFamily={"JetBrains Mono, monospace"}
            fontWeight={800}
            fontSize={62}
          />
          <Txt
            text={"还是"}
            fill={TEXT}
            fontFamily={"JetBrains Mono, monospace"}
            fontWeight={800}
            fontSize={62}
          />
          <Txt
            text={"Borrow"}
            fill={BLUE}
            fontFamily={"JetBrains Mono, monospace"}
            fontWeight={800}
            fontSize={62}
          />
          <Txt
            text={"？"}
            fill={TEXT}
            fontFamily={"JetBrains Mono, monospace"}
            fontWeight={800}
            fontSize={62}
          />
        </Layout>
        <Txt text={"关键在于：所有权有没有转移"} fill={MUTED} fontSize={31} />
      </Layout>

      <Line
        ref={divider}
        points={[
          [0, -530],
          [0, 460],
        ]}
        stroke={"#34405C"}
        lineWidth={4}
        start={0.5}
        end={0.5}
      />

      <Rect
        ref={moveCard}
        x={-270}
        y={-40}
        width={470}
        height={980}
        radius={34}
        fill={PANEL}
        stroke={"#4C4320"}
        lineWidth={4}
        opacity={0}
        scale={0.92}
      >
        <Layout
          layout
          direction={"column"}
          alignItems={"center"}
          gap={50}
          padding={[55, 25]}
        >
          <Txt
            text={"Move"}
            fill={YELLOW}
            fontFamily={"JetBrains Mono, monospace"}
            fontWeight={900}
            fontSize={66}
          />
          <Txt text={"所有权"} fill={MUTED} fontSize={28} />

          <Layout height={260}>
            <Layout key="move_layout" layout={false}>
              <Circle x={-130} y={15} size={82} fill={BLUE} />
              <Txt
                text={"小明"}
                x={-130}
                y={92}
                fill={BLUE}
                fontWeight={700}
                fontSize={30}
              />
              <Circle x={130} y={15} size={82} fill={RED} />
              <Txt
                text={"张三"}
                x={130}
                y={92}
                fill={RED}
                fontWeight={700}
                fontSize={30}
              />
              <Line
                ref={moveRelation}
                points={[
                  [-75, 15],
                  [70, 15],
                ]}
                stroke={YELLOW}
                lineWidth={9}
                endArrow
                arrowSize={22}
                end={0}
              />
              <Layout x={5} y={-52} scale={0.45}>
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
            </Layout>
          </Layout>

          <Txt text={"钥匙转移"} fill={TEXT} fontWeight={700} fontSize={38} />
          <Rect
            ref={moveResult}
            width={385}
            height={135}
            radius={24}
            fill={"#3A1C29"}
            stroke={RED}
            lineWidth={3}
            opacity={0}
          >
            <Layout
              layout
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={7}
              size={"100%"}
            >
              <Txt text={"×"} fill={RED} fontWeight={900} fontSize={43} />
              <Txt
                text={"原所有者失效"}
                fill={TEXT}
                fontWeight={700}
                fontSize={31}
              />
            </Layout>
          </Rect>
        </Layout>
      </Rect>

      <Rect
        ref={borrowCard}
        x={270}
        y={-40}
        width={470}
        height={980}
        radius={34}
        fill={PANEL}
        stroke={"#274E76"}
        lineWidth={4}
        opacity={0}
        scale={0.92}
      >
        <Layout
          layout
          direction={"column"}
          alignItems={"center"}
          gap={50}
          padding={[55, 25]}
        >
          <Txt
            text={"Borrow"}
            fill={BLUE}
            fontFamily={"JetBrains Mono, monospace"}
            fontWeight={900}
            fontSize={61}
          />
          <Txt text={"& 引用"} fill={MUTED} fontSize={28} />

          <Layout height={260}>
            <Layout key="borrow_layout" layout={false}>
              <Circle x={-130} y={15} size={82} fill={BLUE} />
              <Txt
                text={"小明"}
                x={-130}
                y={92}
                fill={BLUE}
                fontWeight={700}
                fontSize={30}
              />
              <Circle x={130} y={15} size={82} fill={RED} />
              <Txt
                text={"张三"}
                x={130}
                y={92}
                fill={RED}
                fontWeight={700}
                fontSize={30}
              />
              <Line
                ref={borrowRelation}
                points={[
                  [-75, 15],
                  [70, 15],
                ]}
                stroke={BLUE}
                lineWidth={7}
                lineDash={[16, 12]}
                endArrow
                arrowSize={22}
                end={0}
              />
              <Rect
                x={5}
                y={-52}
                width={115}
                height={70}
                radius={14}
                fill={"#173659"}
                stroke={BLUE}
                lineWidth={3}
              >
                <Txt
                  text={"&"}
                  fill={BLUE}
                  fontFamily={"JetBrains Mono, monospace"}
                  fontWeight={900}
                  fontSize={42}
                />
              </Rect>
            </Layout>
          </Layout>

          <Txt text={"临时访问"} fill={TEXT} fontWeight={700} fontSize={38} />
          <Rect
            ref={borrowResult}
            width={385}
            height={135}
            radius={24}
            fill={"#173659"}
            stroke={BLUE}
            lineWidth={3}
            opacity={0}
          >
            <Layout
              layout
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={7}
              size={"100%"}
            >
              <Txt text={"✓"} fill={BLUE} fontWeight={900} fontSize={39} />
              <Txt
                text={"原所有者仍然有效"}
                fill={TEXT}
                fontWeight={700}
                fontSize={29}
              />
            </Layout>
          </Rect>
        </Layout>
      </Rect>

      <Txt
        ref={summary}
        y={600}
        text={"交出钥匙 vs 暂时使用"}
        fill={TEXT}
        fontWeight={800}
        fontSize={43}
        opacity={0}
      />
    </>,
  );

  yield* title().opacity(1, 0.2);

  yield* waitUntil("scene7_show_comparison");
  yield* all(
    divider().start(0, 0.5),
    divider().end(1, 0.5),
    moveCard().opacity(1, 0.3),
    moveCard().scale(1, 0.3, easeOutBack),
    borrowCard().opacity(1, 0.3),
    borrowCard().scale(1, 0.3, easeOutBack),
  );

  yield* waitUntil("scene7_move");
  yield* all(moveRelation().end(1, 0.55), moveResult().opacity(1, 0.4));

  yield* waitUntil("scene7_borrow");
  yield* all(borrowRelation().end(1, 0.55), borrowResult().opacity(1, 0.4));

  yield* waitUntil("scene7_summary");
  yield* summary().opacity(1, 0.4);

  yield* waitUntil("scene7_end");
});
