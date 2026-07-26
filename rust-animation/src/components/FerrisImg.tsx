import { Img } from "@motion-canvas/2d";
import FerrisPng from "../../images/Ferris.png";
import { ReferenceReceiver } from "@motion-canvas/core";

export interface FerrisImgProps {
  key?: string;
  ref?: ReferenceReceiver<Img>;
  scale?: number;
  x?: number;
  y?: number;
  opacity?: number;
}

/**
 * Ferris （ Rust 吉祥物 ）
 * 
 * 踢-动作
 *  yield* chain(
 *    ferrisImg().position.x(200, 0.2),
 *    ferrisImg().rotation(40, 0.3).to(-60, 0.2).to(0, 0.2),
 *    ferrisImg().position.x(0, 0.2),
 *  );
 * 
 * @param 参数
 * @returns
 */
export function FerrisImg({
  key = "ferris_img",
  ref,
  scale = 0.3,
  x = 0,
  y = 0,
  opacity = 1,
}: FerrisImgProps) {
  return (
    <Img
      key={key}
      ref={ref}
      src={FerrisPng}
      scale={scale}
      x={x}
      y={y}
      opacity={opacity}
    />
  );
}
