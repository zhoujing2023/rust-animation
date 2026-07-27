import { Layout, Txt } from "@motion-canvas/2d";
import { COLORS } from "../constants";

export interface TitleLayoutProps {
  key?: string;
  x?: number;
  y?: number;
  title: string;
  subtitle?: [string, number, string];
}

/**
 * 标题
 * @param 参数
 * @returns
 */
export function TitleLayout({
  key,
  x = 0,
  y = 0,
  title,
  subtitle,
}: TitleLayoutProps) {
  return (
    <Layout
      key={key}
      layout
      direction={"column"}
      alignItems={"center"}
      x={x}
      y={y}
      gap={10}
    >
      <Txt text={title} fill={COLORS.text} fontWeight={800} fontSize={54} />
      <Txt
        text={subtitle?.[0]}
        fill={subtitle?.[2]}
        fontFamily={"JetBrains Mono, monospace"}
        fontSize={subtitle?.[1]}
      />
    </Layout>
  );
}
