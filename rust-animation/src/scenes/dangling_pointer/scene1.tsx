import {
  Camera,
  Circle,
  Code,
  Img,
  Layout,
  Line,
  Rect,
  Txt,
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
import { CodeRect } from "../../components/CodeRect";
import { TitleLayout } from "../../components/TitleLayout";
import { UnderLine } from "../../components/UnderLine";
import { COLORS } from "../../constants";
import { SolidLine } from "../../components/SolidLine";
import { ErrorMsgRect } from "../../components/ErrorMsgRect";
import FerrisSecurityGuardPng from "../../../images/FerrisSecurityGuard.png";

const CODE = `fn get_msg() -> &String {
    let msg = String::from("hello");
    &msg
}`;

const CODE2 = `fn main() {
    let msg = get_msg();
    println!("{}", msg);
}

fn get_msg() -> &String {
    let msg = String::from("hello");
    &msg
}`;

export default makeScene2D(function* (view) {
  view.fill(COLORS.bg);

  const camera = createRef<Camera>();
  const title = createRef<Layout>();
  const codePanel = createRef<Rect>();
  const code = createRef<Code>();
  const ghost = createRef<Txt>();
  const ferris = createRef<Img>();
  const underline = createRef<Line>();
  const compilerTag = createRef<Rect>();
  const ruleBox = createRef<Rect>();

  const codeBackground = createRef<Layout>();
  const readerCode1ScopeBackground = createRef<Rect>();
  const readerCode2ScopeBackground = createRef<Rect>();

  const strikethrough1 = createRef<Line>();
  const strikethrough2 = createRef<Line>();

  const funcRefInfoBox = createRef<Rect>();
  const releaseLabel = createRef<Layout>();
  const danglingPointerInfoBox = createRef<Rect>();

  view.add(
    <Camera ref={camera}>
      <Layout width={1080} height={1920}>
        <Layout ref={title} y={-770} opacity={1}>
          <TitleLayout
            title="悬垂引用"
            subtitle={["DANGLING REFERENCE", 26, COLORS.red]}
          />
        </Layout>

        <CodeRect
          rectRef={codePanel}
          codeRef={code}
          code={CODE}
          filename="main.rs"
          width={960}
          height={400}
          y={-300}
          opacity={1}
          shadowBlur={0}
          background={
            <Layout ref={codeBackground} layout={false} y={0} opacity={0}>
              <Rect
                ref={readerCode1ScopeBackground}
                width={0}
                height={60}
                fill={"#373a6a"}
                opacity={1}
                x={-400}
                y={0}
                offsetX={-1}
              />
              <Rect
                ref={readerCode2ScopeBackground}
                width={0}
                height={60}
                fill={"#373a6a"}
                opacity={1}
                x={-400}
                y={60}
                offsetX={-1}
              />
            </Layout>
          }
        />

        <Line
          ref={strikethrough1}
          lineWidth={2}
          points={[
            [-360, -300],
            [265, -300],
          ]}
          stroke={"white"}
          end={0}
        />

        <Line
          ref={strikethrough2}
          lineWidth={2}
          points={[
            [-360, -242],
            [-270, -242],
          ]}
          stroke={"white"}
          end={0}
        />

        <Txt
          ref={ghost}
          x={-220}
          y={-240}
          text="👻"
          fontSize={112}
          opacity={0}
          scale={0.0}
        />

        <Rect
          ref={funcRefInfoBox}
          y={0}
          width={940}
          height={150}
          radius={30}
          fill={COLORS.panel}
          stroke={COLORS.blue}
          lineWidth={3}
          opacity={0}
          shadowBlur={0}
          shadowColor={"#00000066"}
        >
          <Txt
            text="一旦函数执行结束，它的数据就会被释放"
            fill={COLORS.text}
            fontSize={38}
            fontWeight={700}
          />
        </Rect>

        <Layout ref={releaseLabel} opacity={0}>
          <SolidLine
            points={[
              [-30, -530],
              [-70, -480],
            ]}
            lineWidth={6}
            arrowSize={16}
            end={1}
          />
          <Txt fill={COLORS.blue} fontSize={36} y={-550} x={100}>
            &msg 已被释放
          </Txt>
        </Layout>

        <Rect
          ref={danglingPointerInfoBox}
          y={200}
          width={940}
          height={150}
          radius={30}
          fill={COLORS.panel}
          stroke={COLORS.blue}
          lineWidth={3}
          opacity={0}
          shadowBlur={0}
          shadowColor={"#00000066"}
        >
          <Layout layout>
            <Txt
              text="悬垂引用："
              fill={COLORS.yellow}
              fontSize={38}
              fontWeight={800}
            />
            <Txt
              text="指向一块已经释放或无效内存的指针"
              fill={COLORS.text}
              fontSize={38}
              fontWeight={700}
            />
          </Layout>
        </Rect>

        <UnderLine ref={underline} x={145} y={-194} length={7} />

        <Img
          ref={ferris}
          src={FerrisSecurityGuardPng}
          scale={0.28}
          x={1000}
          y={-10}
          opacity={1}
        />

        <ErrorMsgRect
          ref={compilerTag}
          y={160}
          errContent={"error: borrowed value does not live long enough"}
        />

        <Rect
          ref={ruleBox}
          y={400}
          width={940}
          height={150}
          radius={30}
          fill={COLORS.panel}
          stroke={COLORS.red}
          lineWidth={3}
          opacity={0}
          scale={0.3}
        >
          <Txt
            text="引用不能比它指向的数据活得更久"
            fill={COLORS.text}
            fontSize={38}
            fontWeight={700}
          />
        </Rect>
      </Layout>
    </Camera>,
  );

  yield* all(camera().zoom(1.3, 0.5), camera().position([-90, 0], 0.5));
  yield* waitUntil("scene1_show_func_code_ends");

  codeBackground().opacity(1);
  yield* chain(
    readerCode1ScopeBackground().width(700, 0.3),
    readerCode2ScopeBackground().width(160, 0.3),
  );

  yield* waitUntil("scene1_func_release");
  // todo: 修改 readerCode1ScopeBackground 中的 offsetX 属性为 1
  readerCode1ScopeBackground().offset.x(1);
  readerCode1ScopeBackground().position.x(300);
  readerCode2ScopeBackground().offset.x(1);
  readerCode2ScopeBackground().position.x(-240);
  yield* chain(
    all(
      readerCode1ScopeBackground().width(0, 0.5),
      strikethrough1().end(1, 0.5),
    ),
    all(
      readerCode2ScopeBackground().width(0, 0.5),
      strikethrough2().end(1, 0.5),
    ),
    all(ghost().opacity(1, 0.2), ghost().scale(0.4, 0.5, easeOutBack)),
  );
  funcRefInfoBox().opacity(1);
  funcRefInfoBox().position.x(-100);

  yield* waitUntil("scene1_camera_reset");
  yield* all(camera().reset(0.5), funcRefInfoBox().position.x(0, 0.5));

  yield* waitUntil("scene1_func_call");
  funcRefInfoBox().opacity(0);
  yield* all(
    code().code(CODE2, 0.3),
    strikethrough1().position([0, 140], 0.3),
    strikethrough2().position([0, 140], 0.3),
    codePanel().height(700, 0.3),
    ghost().position([-200, -100], 0.3),
  );

  yield* waitUntil("scene1_func_return");
  yield* ghost().position([70, -450], 0.5);
  yield* all(releaseLabel().opacity(1, 0.3));
  danglingPointerInfoBox().opacity(1);

  yield* waitUntil("scene1_compile_rejected");
  yield* all(
    ghost().opacity(0, 0.1),
    releaseLabel().opacity(0, 0.1),
    danglingPointerInfoBox().scale(0, 0.3),
    underline().opacity(1, 0.1),
    underline().end(1, 0.55),
  );
  compilerTag().opacity(1);
  compilerTag().scale(0);
  ferris().opacity(1);
  yield* all(
    compilerTag().scale(1, 0.2),
    ferris().position.x(300, 0.55, easeOutBack),
  );

  yield* waitUntil("scene1_lifetime_rule");
  ruleBox().opacity(1);
  yield* all(ruleBox().scale(1, 0.3, easeOutBack));

  yield* waitUntil("scene1_end");
  yield* waitFor(0.3);
});
