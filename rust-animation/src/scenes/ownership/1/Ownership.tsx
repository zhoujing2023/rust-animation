import { Layout, Line, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {
  all,
  createRef,
  createSignal,
  easeOutBack,
  waitUntil,
} from "@motion-canvas/core";
import { DefaultPictogramLayout } from "../../../components/DefaultPictogramLayout";
import { KeyLayout } from "../../../components/KeyLayout";
import { VehicleLayout } from "../../../components/VehicleLayout";
import { SolidLine } from "../../../components/SolidLine";

const BG = "#0B1020";
const TEXT = "#E8ECF6";
const MUTED = "#94A0BA";
const BLUE = "#55A7FF";
const YELLOW = "#FFD447";

export default makeScene2D(function* (view) {
  view.fill(BG);

  const owner = createRef<Layout>();
  const scooter = createRef<Layout>();
  const figureSize = createSignal(0.85);
  const keySize = createSignal(0);
  const vehicleSize = createSignal(0.85);
  const ownerLink = createRef<Line>();
  const controlLink = createRef<Line>();
  const title = createRef<Txt>();
  const summary = createRef<Rect>();

  view.add(
    <Layout y={-200}>
      <Txt
        ref={title}
        y={-350}
        text={"Owner"}
        fill={YELLOW}
        fontFamily={"JetBrains Mono, monospace"}
        fontWeight={800}
        fontSize={76}
        opacity={0}
      />

      <SolidLine
        ref={ownerLink}
        points={[
          [-220, 0],
          [-95, 0],
        ]}
        y={-10}
      ></SolidLine>

      <Txt
        text={"持有"}
        x={-160}
        y={-80}
        fill={BLUE}
        fontSize={32}
        opacity={() => ownerLink().end()}
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

      <DefaultPictogramLayout
        layoutRef={owner}
        size={figureSize}
        x={-400}
        y={-30}
        label1="小明"
        label2="所有者"
      />

      <KeyLayout size={keySize} y={-10} label="唯一钥匙" opacity={1} />

      <VehicleLayout
        layoutRef={scooter}
        size={vehicleSize}
        x={420}
        y={-40}
        label1="电动车"
        label2="数据"
      />

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
    </Layout>,
  );

  owner().x(-700);
  scooter().x(700);
  yield* all(
    owner().opacity(1, 0.45),
    owner().x(-300, 0.8, easeOutBack),
    scooter().opacity(1, 0.45),
    scooter().x(290, 0.8, easeOutBack),
  );

  yield* waitUntil("scene2_key_appears");
  yield* keySize(0.85, 0.65, easeOutBack);

  yield* waitUntil("scene2_owner_relation");
  yield* all(ownerLink().end(1, 0.55), title().opacity(1, 0.45));

  yield* waitUntil("scene2_controls_vehicle");
  yield* controlLink().end(1, 0.55);

  yield* waitUntil("scene2_one_owner");
  yield* all(summary().opacity(1, 0.35), summary().scale(1, 0.5, easeOutBack));

  yield* waitUntil("scene2_end");
});
