import { Layout, Txt } from "@motion-canvas/2d";

export interface TitleLayoutProps {
  key?: string;
  x?: number;
  y?: number;
  title: [string, number, string, number]; // 内容，大小，颜色，粗细
  subtitle?: [string, number, string];
}

/**
 * 标题
 * @param 参数
 * @returns 
 */
export function TitleLayout({
  key = "title_layout",
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
      <Txt
        text={title[0]}
        fill={title[2]}
        fontWeight={title[3]}
        fontSize={title[1]}
      />
      <Txt
        text={subtitle?.[0]}
        fill={subtitle?.[2]}
        fontFamily={"JetBrains Mono, monospace"}
        fontSize={subtitle?.[1]}
      />
    </Layout>
  );
}
