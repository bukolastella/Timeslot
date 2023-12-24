import { FC, useLayoutEffect, useRef } from "react";
import { HeroImagesData } from "./data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface Props {
  img: string;
  right: number;
  top: string;
  rotate: number;
  width: number;
  height: number;
  index: number;
  addAnimation: (animation: GSAPTimeline) => void;
}

const HeroImages: FC<Props> = ({
  img,
  right,
  top,
  rotate,
  index,
  width,
  height,
  addAnimation,
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
        // paused: true,
        defaults: {
          duration: duration,
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

      addAnimation(tl);
    }, app);

    return () => ctx.current?.revert();
  }, [right, top, rotate, width, height, addAnimation]);

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
