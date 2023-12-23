import { FC, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { HeroImagesData } from "./data";

interface Props {
  img: string;
  right: number;
  top: string;
  rotate: number;
  width: number;
  height: number;
  index: number;
}

const HeroImages: FC<Props> = ({
  img,
  right,
  top,
  rotate,
  index,
  width,
  height,
}) => {
  const app = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context>();

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {
      const duration = 5;
      const midPoint = 70;
      const firstR = (midPoint / 100) * duration;
      const secondR = duration - firstR;

      const tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: duration,
          //   delay: 5, //
        },
      });

      tl.from(".hero-img", {
        width: width,
        height: height,
        right: right,
        top: top,
        translateX: 0,
        yPercent: -100,
      })
        .to(
          ".hero-img",
          {
            rotate: rotate,
            duration: firstR,
          },
          "<"
        )
        .to(
          ".hero-img",
          {
            rotate: 0,
            duration: secondR,
          },
          `<${midPoint}%`
        );
    }, app);

    return () => ctx.current?.revert();
  }, [right, top, rotate, width, height]);

  return (
    <div ref={app}>
      <img
        src={img}
        alt=""
        className={`absolute top-1/2 right-1/2 w-[360px] h-[270px] translate-x-1/2 -translate-y-1/2 object-cover hero-img`}
        style={{
          zIndex: HeroImagesData.length - index,
        }}
      />
    </div>
  );
};

export default HeroImages;
