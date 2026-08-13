import { Code, Layout, Line, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {
  all,
  createRef,
  Direction,
  easeInOutCubic,
  easeOutBack,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { CodeRect } from "../../components/CodeRect";
import { TitleLayout } from "../../components/TitleLayout";
import { COLORS } from "../../constants";
import { DoubtPictogramLayout } from "../../components/DoubtPictogramLayout";

const BAD_CODE = `fn main() {
    let msg = get_msg();
    println!("{}", msg);
}

fn get_msg() -> &String {
    let msg = String::from("hello");
    &msg
}`;

const GOOD_CODE = `fn main() {
    let msg = get_msg(); 
    println!("{}", msg);
}

fn get_msg() -> String {
    let msg = String::from("hello");
    msg
}`;

const GOOD_CODE2 = `fn main() {
    let msg = get_msg();
    // 等价于：let msg = String::from("hello");
    println!("{}", msg);
}

fn get_msg() -> String {
    let msg = String::from("hello");
    msg
}`;

export default makeScene2D(function* (view) {
  view.fill(COLORS.bg);

  const codePanel = createRef<Rect>();
  const code = createRef<Code>();
  const arrow = createRef<Line>();
  const arrow2 = createRef<Line>();
  const ruleBox = createRef<Rect>();
  const data = createRef<Rect>();
  const owner = createRef<Rect>();
  const link = createRef<Line>();
  const success = createRef<Rect>();
  const person = createRef<Layout>();
  const explanation = createRef<Rect>();

  view.add(
    <>
      <TitleLayout
        y={-770}
        title="如何正确返回数据？"
        subtitle={["MOVE OWNERSHIP", 26, COLORS.green]}
      />
      <CodeRect
        rectRef={codePanel}
        codeRef={code}
        code={BAD_CODE}
        filename="main.rs"
        width={960}
        height={700}
        y={-650}
        opacity={1}
        offsetY={-1}
      />

      <Line
        ref={arrow}
        points={[
          [50, 60],
          [-110, -195],
        ]}
        stroke={COLORS.yellow}
        lineWidth={6}
        lineDash={[14, 12]}
        endArrow
        arrowSize={18}
        end={0}
      />
      <Line
        ref={arrow2}
        points={[
          [-50, 60],
          [-320, -70],
        ]}
        stroke={COLORS.yellow}
        lineWidth={6}
        lineDash={[14, 12]}
        endArrow
        arrowSize={18}
        end={0}
      />
      <Rect
        ref={explanation}
        x={0}
        y={120}
        width={360}
        height={94}
        radius={22}
        fill={COLORS.panel}
        stroke={COLORS.yellow}
        lineWidth={3}
        opacity={0}
      >
        <Txt
          text="删掉引用符号 &"
          fill={COLORS.yellow}
          fontSize={31}
          fontWeight={700}
        />
      </Rect>

      <Rect
        ref={ruleBox}
        y={340}
        width={940}
        height={150}
        radius={30}
        fill={COLORS.panel}
        stroke={COLORS.yellow}
        lineWidth={3}
        opacity={0}
        scale={0.9}
      >
        <Txt
          text="将引用改为所有权转移"
          fill={COLORS.text}
          fontSize={40}
          fontWeight={700}
        />
      </Rect>

      <Layout y={450}>
        <Rect
          ref={data}
          x={-280}
          width={280}
          height={150}
          radius={28}
          fill={`${COLORS.yellow}22`}
          stroke={COLORS.yellow}
          lineWidth={3}
          opacity={0}
        >
          <Txt
            text={'String\n"hello"'}
            fill={COLORS.yellow}
            fontFamily="JetBrains Mono, monospace"
            fontSize={32}
            textAlign="center"
          />
        </Rect>
        <Line
          ref={link}
          points={[
            [-110, 0],
            [90, 0],
          ]}
          stroke={COLORS.green}
          lineWidth={6}
          endArrow
          arrowSize={20}
          end={0}
        />
        <Rect
          ref={owner}
          x={265}
          width={300}
          height={150}
          radius={28}
          fill={`${COLORS.green}20`}
          stroke={COLORS.green}
          lineWidth={3}
          opacity={0}
        >
          <Txt
            text={"新所有者\nmain::msg"}
            fill={COLORS.green}
            fontSize={32}
            fontWeight={700}
            textAlign="center"
          />
        </Rect>
      </Layout>
      <Rect
        ref={success}
        y={610}
        width={660}
        height={86}
        radius={43}
        fill={COLORS.panel}
        opacity={0}
        scale={0.8}
        stroke={COLORS.green}
        lineWidth={3}
      >
        <Txt
          text="✓ 数据继续有效，由新所有者管理"
          fill={COLORS.green}
          fontSize={29}
          fontWeight={800}
        />
      </Rect>
      <DoubtPictogramLayout ref={person} y={350} opacity={1} />
    </>,
  );

  yield* slideTransition(Direction.Right, 0.3);
  yield* waitFor(0.3);

  yield* waitUntil("scene2_confuse");
  yield* waitUntil("scene2_how_to_return");
  yield* all(
    person().opacity(0, 0.3),
    explanation().opacity(1, 0.3),
    arrow().end(1, 0.7),
    arrow2().end(1, 0.7),
    ruleBox().opacity(1, 0.45),
    ruleBox().scale(1, 0.5, easeOutBack),
  );

  yield* waitUntil("scene2_move_ownership");
  yield* all(
    arrow().opacity(0, 0.25),
    arrow2().opacity(0, 0.25),
    explanation().opacity(0, 0.25),
    code().code(GOOD_CODE, 0.9),
    ruleBox().stroke(COLORS.green, 0.6),
    ruleBox().position.y(250, 0.6),
  );

  yield* waitUntil("scene2_data_survives");
  yield* all(data().opacity(1, 0.4), owner().opacity(1, 0.4));
  yield* link().end(1, 0.7, easeInOutCubic);
  yield* all(
    data().stroke(COLORS.green, 0.5),
    success().opacity(1, 0.4),
    success().scale(1, 0.5, easeOutBack),
  );

  yield* waitUntil("scene2_equivalent");
  yield* all(code().code(GOOD_CODE2, 0.4), codePanel().height(750, 0.4));

  yield* waitUntil("scene2_end");
  yield* waitFor(0.3);
});
