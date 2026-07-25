import {
  Code,
  Layout,
  Line,
  Rect,
  Txt,
  lines,
  makeScene2D,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  easeOutBack,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { CodeRect } from "../../../components/CodeRect";

const BG = "#0B1020";
const TEXT = "#E8ECF6";
const RED = "#FF5C68";
const BLUE = "#55A7FF";

export default makeScene2D(function* (view) {
  view.fill(BG);

  const codeCard = createRef<Rect>();
  const code = createRef<Code>();
  const underline = createRef<Line>();
  const error = createRef<Rect>();

  view.add(
    <>
      <Layout
        key="title_layout"
        layout
        direction={"column"}
        alignItems={"center"}
        y={-550}
        gap={20}
      >
        <Txt
          text={"为什么赋值一次，原变量就不能再用了？"}
          fill={TEXT}
          fontFamily={"Inter, sans-serif"}
          fontWeight={700}
          fontSize={54}
          width={900}
          textAlign={"center"}
          textWrap
        />
        <Txt
          text={"RUST OWNERSHIP"}
          fill={BLUE}
          fontFamily={"JetBrains Mono, monospace"}
          fontSize={26}
          letterSpacing={6}
        />
      </Layout>

      <CodeRect
        rectRef={codeCard}
        rectPositionY={210}
        codeRef={code}
        code={`let xiaoming_key = String::from("电动车钥匙");\nlet zhangsan_key = xiaoming_key;\n\nprintln!("{}", xiaoming_key);`}
        selection={lines(0)}
      />

      <Line
        ref={underline}
        points={[
          [-290, 0],
          [-260, 10],
          [-230, 0],
          [-200, 10],
          [-170, 0],
          [-140, 10],
          [-110, 0],
          [-80, 10],
          [-50, 0],
          [-20, 10],
          [10, 0],
        ]}
        x={130}
        y={20}
        stroke={RED}
        lineWidth={6}
        lineCap={"round"}
        end={0}
        opacity={0}
      />

      <Rect
        ref={error}
        y={170}
        width={900}
        height={150}
        radius={24}
        fill={"#351B29"}
        stroke={RED}
        lineWidth={3}
        padding={[28, 34]}
        opacity={0}
        scale={0.9}
      >
        <Layout layout direction={"column"} gap={10}>
          <Txt
            text={"COMPILER ERROR"}
            fill={RED}
            fontFamily={"JetBrains Mono, monospace"}
            fontWeight={700}
            fontSize={24}
          />
          <Txt
            text={"borrow of moved value: `xiaoming_key`"}
            fill={TEXT}
            fontFamily={"JetBrains Mono, monospace"}
            fontSize={29}
          />
        </Layout>
      </Rect>
    </>,
  );

  codeCard().y(520);


  
  yield* all(codeCard().opacity(1, 0.45), codeCard().y(0, 0.8, easeOutBack));

  yield* waitUntil("scene1_create_key");
  yield* code().selection(lines(0), 0.3);

  yield* waitUntil("scene1_move_key");
  yield* code().selection(lines(1), 0.35);

  yield* waitUntil("scene1_use_moved_value");
  yield* code().selection(lines(3), 0.3);
  yield* waitFor(0.4);
  yield* underline().opacity(1).end(1, 0.4);
  yield* chain(
    codeCard().x(-14, 0.07),
    codeCard().x(14, 0.07),
    codeCard().x(-9, 0.07),
    codeCard().x(9, 0.07),
    codeCard().x(0, 0.07),
  );
  yield* all(error().opacity(1, 0.25), error().scale(1, 0.4, easeOutBack));

  yield* waitUntil("scene1_end");
});

