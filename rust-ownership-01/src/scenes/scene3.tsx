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
const TEXT = "#E8ECF6";
const MUTED = "#94A0BA";
const BLUE = "#55A7FF";
const RED = "#fa6767";
const YELLOW = "#FFD447";

export default makeScene2D(function* (view) {
  view.fill(BG);

  const xiaoming = createRef<Layout>();
  const zhangsan = createRef<Layout>();

  const xiaomingTag = createRef<Txt>();
  const zhangsanTag = createRef<Txt>();

  const scooter = createRef<Layout>();
  const key = createRef<Layout>();
  const moveTitle = createRef<Txt>();

  const xiaomingLink = createRef<Line>();
  const controlLink = createRef<Line>();

  const summary = createRef<Rect>();
  const forbidden = createRef<Layout>();

  view.add(
    <Layout y={-200}>
      <Layout
        key={"scene3_title"}
        ref={moveTitle}
        layout
        direction={"column"}
        alignItems={"center"}
        y={-350}
        gap={8}
        opacity={0}
        scale={0.9}
      >
        <Txt
          text={"Move"}
          fill={YELLOW}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={800}
          fontSize={82}
        />
        <Txt text={"所有权转移"} fill={TEXT} fontWeight={700} fontSize={42} />
      </Layout>

      <Line
        ref={xiaomingLink}
        points={[
          [-220, 0],
          [-95, 0],
        ]}
        y={-10}
        stroke={BLUE}
        lineWidth={10}
        endArrow
        arrowSize={24}
        end={0}
      />
      <Txt
        text={"持有"}
        x={-160}
        y={-80}
        fill={BLUE}
        fontSize={32}
        opacity={() => xiaomingLink().end()}
      />

      <Line
        ref={controlLink}
        points={[
          [100, 0],
          [200, 0],
        ]}
        y={-10}
        stroke={YELLOW}
        lineWidth={10}
        endArrow
        arrowSize={24}
        end={0}
      />
      <Txt
        text={"控制"}
        x={130}
        y={-80}
        fill={YELLOW}
        fontSize={32}
        opacity={() => controlLink().end()}
      />

      <Layout
        key="xiaoming_layout"
        ref={xiaoming}
        x={400}
        y={-30}
        scale={0.85}
        opacity={0}
      >
        <Circle y={-135} size={110} fill={BLUE} />
        <Line
          points={[
            [0, -75],
            [0, 100],
          ]}
          stroke={BLUE}
          lineWidth={36}
          lineCap={"round"}
        />
        <Line
          points={[
            [-75, -5],
            [0, -50],
            [75, -5],
          ]}
          stroke={BLUE}
          lineWidth={28}
          lineCap={"round"}
        />
        <Line
          points={[
            [-60, 195],
            [0, 95],
            [60, 195],
          ]}
          stroke={BLUE}
          lineWidth={30}
          lineCap={"round"}
        />
        <Txt text={"小明"} y={275} fill={TEXT} fontWeight={700} fontSize={50} />
        <Txt
          ref={xiaomingTag}
          text={"所有者"}
          y={330}
          fill={BLUE}
          fontSize={32}
        />
      </Layout>

      <Layout
        key="zhangsan_layout"
        ref={zhangsan}
        x={600}
        y={-30}
        scale={0.85}
        opacity={0}
      >
        <Circle y={-135} size={110} fill={RED} />
        <Line
          points={[
            [0, -75],
            [0, 100],
          ]}
          stroke={RED}
          lineWidth={36}
          lineCap={"round"}
        />
        <Line
          points={[
            [-75, -5],
            [0, -50],
            [75, -5],
          ]}
          stroke={RED}
          lineWidth={28}
          lineCap={"round"}
        />
        <Line
          points={[
            [-60, 195],
            [0, 95],
            [60, 195],
          ]}
          stroke={RED}
          lineWidth={30}
          lineCap={"round"}
        />
        <Txt text={"张三"} y={275} fill={TEXT} fontWeight={700} fontSize={50} />
        <Txt ref={zhangsanTag} y={330} fill={BLUE} fontSize={32} />
      </Layout>

      <Layout key="key_layout" ref={key} y={-10} scale={0}>
        <Circle x={-60} size={70} stroke={YELLOW} lineWidth={18} />
        <Line
          points={[
            [-15, 0],
            [95, 0],
          ]}
          stroke={YELLOW}
          lineWidth={24}
          lineCap={"round"}
        />
        <Line
          points={[
            [20, 0],
            [20, 35],
          ]}
          stroke={YELLOW}
          lineWidth={18}
        />
        <Line
          points={[
            [60, 0],
            [60, 28],
          ]}
          stroke={YELLOW}
          lineWidth={18}
        />
        <Txt
          text={"唯一的钥匙"}
          y={125}
          fill={YELLOW}
          fontWeight={700}
          fontSize={40}
        />
      </Layout>

      <Layout
        key="vehicle_layout"
        ref={scooter}
        x={420}
        y={-40}
        scale={0.85}
        opacity={0}
      >
        <Circle x={-90} y={115} size={105} stroke={MUTED} lineWidth={22} />
        <Circle x={115} y={115} size={105} stroke={MUTED} lineWidth={22} />
        <Line
          points={[
            [-80, 95],
            [-20, 10],
            [105, 95],
            [-35, 95],
          ]}
          stroke={MUTED}
          lineWidth={28}
          lineJoin={"round"}
        />
        <Line
          points={[
            [75, 70],
            [55, -75],
            [110, -75],
          ]}
          stroke={MUTED}
          lineWidth={25}
          lineCap={"round"}
        />
        <Rect x={-55} y={-5} width={135} height={40} radius={25} fill={BLUE} />
        <Txt
          text={"电动车"}
          y={255}
          fill={TEXT}
          fontWeight={700}
          fontSize={50}
        />
        <Txt text={"数据"} y={310} fill={MUTED} fontSize={32} />
      </Layout>

      <Rect
        ref={summary}
        y={430}
        width={910}
        height={180}
        radius={30}
        fill={"#151C31"}
        stroke={"#2A3552"}
        lineWidth={3}
        padding={[34, 40]}
        opacity={0}
        scale={0.94}
      >
        <Layout layout direction={"column"} alignItems={"center"} gap={14}>
          <Txt
            text={"一份数据，一个所有者"}
            fill={TEXT}
            fontWeight={800}
            fontSize={48}
          />
          <Txt
            text={"谁拿着钥匙，谁就能使用这辆车"}
            fill={MUTED}
            fontSize={29}
          />
        </Layout>
      </Rect>

      <Layout
        key={"scene3_forbidden"}
        ref={forbidden}
        x={140}
        y={500}
        scale={0}
      >
        <Circle size={145} stroke={RED} lineWidth={18} fill={"#0B1020DD"} />
        <Line
          points={[
            [-48, -48],
            [48, 48],
          ]}
          stroke={RED}
          lineWidth={18}
          lineCap={"round"}
        />
        <Txt
          text={"不能再使用"}
          y={120}
          fill={RED}
          fontWeight={700}
          fontSize={32}
        />
      </Layout>
    </Layout>,
  );

  moveTitle().opacity(1);
  xiaoming().x(-300).opacity(1);
  scooter().x(290).opacity(1);
  key().scale(0.85);

  xiaomingLink().end(1);
  controlLink().end(1);

  summary().opacity(1);
  summary().scale(1);

  yield* waitUntil("scene3_hide_scene2_superfluous");
  yield* all(
    xiaomingLink().end(0, 0.3),
    controlLink().end(0, 0.3),
    summary().scale(0, 0.3),
  );

  yield* waitUntil("scene3_scooter_key_moves");
  yield* all(scooter().position.y(450, 0.5), key().position.x(-100, 0.5));

  yield* waitUntil("scene3_zhangsan_enters");
  yield* all(zhangsan().position.x(300, 0.3), zhangsan().opacity(0.6, 0.3));

  yield* waitUntil("scene3_key_moves");
  yield* key().position.x(120, 1, easeInOutCubic);

  yield* waitUntil("scene3_new_owner");
  yield* all(
    zhangsan().opacity(1, 0.2),
    zhangsanTag().text("所有者", 0.2),
    xiaoming().opacity(0.6, 0.2),
    xiaomingTag().text("", 0.2),
  );

  yield* waitUntil("scene3_xiaoming_tries");
  yield* xiaoming().position([30, 400], 0.8, easeInOutCubic);
  yield* forbidden().scale(1, 0.4, easeOutBack);

  yield* waitUntil("scene3_end");
});
