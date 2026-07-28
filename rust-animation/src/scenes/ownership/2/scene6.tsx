import { Layout, Line, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {
  all,
  createRef,
  easeInOutCubic,
  easeOutBack,
  waitUntil,
} from "@motion-canvas/core";
import { COLORS } from "../../../constants";

export default makeScene2D(function* (view) {
  view.fill(COLORS.bg);

  const title = createRef<Layout>();
  const immutableCard = createRef<Rect>();
  const sharedCard = createRef<Rect>();
  const mutableCard = createRef<Rect>();
  const lifetimeCard = createRef<Rect>();
  const sharedDots = [createRef<Rect>(), createRef<Rect>(), createRef<Rect>()];
  const exclusiveDot = createRef<Rect>();
  const lifetimeBlue = createRef<Line>();
  const lifetimeRed = createRef<Line>();
  const finalRule = createRef<Rect>();

  view.add(
    <>
      <Layout
        ref={title}
        layout
        direction={"column"}
        alignItems={"center"}
        gap={12}
        y={-745}
        opacity={0}
      >
        <Txt
          text={"Rust 引用规则"}
          fill={COLORS.text}
          fontWeight={800}
          fontSize={62}
        />
        <Txt
          text={"SHARED READ · EXCLUSIVE WRITE"}
          fill={COLORS.blue}
          fontFamily={"JetBrains Mono, monospace"}
          fontSize={23}
          letterSpacing={4}
        />
      </Layout>

      <Rect
        ref={immutableCard}
        y={-475}
        width={920}
        height={175}
        radius={30}
        fill={"#172B45"}
        stroke={COLORS.blue}
        lineWidth={4}
        opacity={0}
        scale={0.88}
        x={-100}
      >
        <Layout
          layout
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          padding={[0, 44]}
        >
          <Rect
            layout
            alignItems={"center"}
            justifyContent={"center"}
            width={165}
            height={92}
            radius={22}
            fill={"#55A7FF22"}
            stroke={COLORS.blue}
            lineWidth={3}
          >
            <Txt
              text={"&T"}
              fill={COLORS.blue}
              fontFamily={"JetBrains Mono, monospace"}
              fontWeight={900}
              fontSize={44}
            />
          </Rect>
          <Layout layout direction={"column"} gap={8} marginLeft={36}>
            <Txt
              text={"不可变引用"}
              fill={COLORS.text}
              fontWeight={800}
              fontSize={35}
            />
            <Txt
              text={"只能读取，不会改变数据"}
              fill={COLORS.muted}
              fontSize={27}
            />
          </Layout>
          <Txt
            text={"只读"}
            fill={COLORS.blue}
            fontWeight={900}
            fontSize={38}
            marginLeft={48}
          />
        </Layout>
      </Rect>

      <Rect
        ref={sharedCard}
        y={-270}
        width={920}
        height={175}
        radius={30}
        fill={"#17362D"}
        stroke={COLORS.green}
        lineWidth={4}
        opacity={0}
        scale={0.88}
        x={100}
      >
        <Layout
          layout
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          padding={[0, 44]}
        >
          <Layout width={175} height={100} alignItems={"center"}>
            {sharedDots.map((dot, index) => (
              <Rect
                ref={dot}
                x={-55 + index * 55}
                size={52}
                radius={26}
                fill={COLORS.green}
                stroke={COLORS.bg}
                lineWidth={4}
                scale={0}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Txt
                  text={"R"}
                  fill={COLORS.bg}
                  fontWeight={900}
                  fontSize={25}
                />
              </Rect>
            ))}
          </Layout>
          <Layout layout direction={"column"} gap={8} marginLeft={30}>
            <Txt
              text={"多个 &T"}
              fill={COLORS.text}
              fontWeight={800}
              fontSize={35}
            />
            <Txt text={"多个读者互不干扰"} fill={COLORS.muted} fontSize={27} />
          </Layout>
          <Txt
            text={"可以共享"}
            fill={COLORS.green}
            fontWeight={900}
            fontSize={36}
            marginLeft={38}
          />
        </Layout>
      </Rect>

      <Rect
        ref={mutableCard}
        y={-65}
        width={920}
        height={175}
        radius={30}
        fill={"#351B29"}
        stroke={COLORS.red}
        lineWidth={4}
        opacity={0}
        scale={0.88}
        x={-100}
      >
        <Layout
          layout
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          padding={[0, 44]}
        >
          <Rect
            ref={exclusiveDot}
            size={94}
            radius={47}
            fill={COLORS.red}
            scale={0}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Txt text={"1"} fill={COLORS.bg} fontWeight={900} fontSize={48} />
          </Rect>
          <Layout layout direction={"column"} gap={8} marginLeft={55}>
            <Txt
              text={"&mut T"}
              fill={COLORS.text}
              fontFamily={"JetBrains Mono, monospace"}
              fontWeight={800}
              fontSize={35}
            />
            <Txt
              text={"同一时刻只有一个编辑者"}
              fill={COLORS.muted}
              fontSize={27}
            />
          </Layout>
          <Txt
            text={"独占修改"}
            fill={COLORS.red}
            fontWeight={900}
            fontSize={36}
            marginLeft={42}
          />
        </Layout>
      </Rect>

      <Rect
        ref={lifetimeCard}
        y={150}
        width={920}
        height={190}
        radius={30}
        fill={COLORS.panel}
        stroke={COLORS.yellow}
        lineWidth={4}
        opacity={0}
        scale={0.88}
        x={100}
      >
        <Layout
          layout
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          padding={[0, 44]}
        >
          <Layout
            width={190}
            height={100}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Line
              ref={lifetimeBlue}
              points={[
                [-80, -20],
                [-8, -20],
              ]}
              stroke={COLORS.blue}
              lineWidth={13}
              lineCap={"round"}
              end={0}
            />
            <Line
              ref={lifetimeRed}
              points={[
                [8, 20],
                [80, 20],
              ]}
              stroke={COLORS.red}
              lineWidth={13}
              lineCap={"round"}
              end={0}
            />
          </Layout>
          <Layout layout direction={"column"} gap={8} marginLeft={20}>
            <Txt
              text={"是否发生冲突？"}
              fill={COLORS.text}
              fontWeight={800}
              fontSize={34}
            />
            <Txt
              text={"看引用最后一次使用的位置"}
              fill={COLORS.muted}
              fontSize={27}
            />
          </Layout>
          <Txt
            text={"范围不重叠"}
            fill={COLORS.yellow}
            fontWeight={900}
            fontSize={32}
            marginLeft={28}
          />
        </Layout>
      </Rect>

      <Rect
        ref={finalRule}
        y={460}
        width={950}
        height={285}
        radius={42}
        fill={COLORS.panel}
        stroke={COLORS.green}
        lineWidth={5}
        opacity={0}
        scale={0.7}
      >
        <Layout layout direction={"column"} alignItems={"center"} gap={26}>
          <Txt
            text={"一句话总结"}
            fill={COLORS.muted}
            fontSize={32}
            letterSpacing={5}
          />
          <Txt
            text={"多人读 · 一人写"}
            fill={COLORS.text}
            fontWeight={900}
            fontSize={57}
          />
          <Txt
            text={"读写不重叠"}
            fill={COLORS.green}
            fontWeight={900}
            fontSize={47}
          />
        </Layout>
      </Rect>
    </>,
  );

  yield* all(title().opacity(1, 0.5), title().y(-700, 0.7, easeOutBack));

  yield* waitUntil("scene6_immutable_summary");
  yield* all(
    immutableCard().opacity(1, 0.35),
    immutableCard().scale(1, 0.5, easeOutBack),
    immutableCard().x(0, 0.5, easeOutBack),
  );

  yield* waitUntil("scene6_shared_summary");
  yield* all(
    sharedCard().opacity(1, 0.35),
    sharedCard().scale(1, 0.5, easeOutBack),
    sharedCard().x(0, 0.5, easeOutBack),
    ...sharedDots.map((dot, index) =>
      dot().scale(1, 0.35 + index * 0.08, easeOutBack),
    ),
  );

  yield* waitUntil("scene6_mutable_summary");
  yield* all(
    mutableCard().opacity(1, 0.35),
    mutableCard().scale(1, 0.5, easeOutBack),
    mutableCard().x(0, 0.5, easeOutBack),
    exclusiveDot().scale(1, 0.5, easeOutBack),
  );

  yield* waitUntil("scene6_lifetime_summary");
  yield* all(
    lifetimeCard().opacity(1, 0.35),
    lifetimeCard().scale(1, 0.5, easeOutBack),
    lifetimeCard().x(0, 0.5, easeOutBack),
    lifetimeBlue().end(1, 0.55, easeInOutCubic),
    lifetimeRed().end(1, 0.55, easeInOutCubic),
  );

  yield* waitUntil("scene6_final_rule");
  yield* all(
    finalRule().opacity(1, 0.4),
    finalRule().scale(1, 0.65, easeOutBack),
  );

  yield* waitUntil("scene6_end");
});
