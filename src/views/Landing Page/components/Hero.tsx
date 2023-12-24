import Logo from "./Logo";
import { HeroImagesData } from "./data";
import HeroImages from "./HeroImages";
import BaseLine from "./BaseLine";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [tl, setTl] = useState<GSAPTimeline>();
  const app = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context>();
  const ctx2 = useRef<gsap.Context>();

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {
      const tl = gsap.timeline();
      setTl(tl);
    }, app);

    return () => ctx.current?.revert();
  }, []);

  useLayoutEffect(() => {
    ctx2.current = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".img-trigger",
        start: "top top",
        end: "bottom top",
        markers: true,
        scrub: 1,
        pin: true,
        // pinSpacing: false,
        animation: tl,
      });
    }, app);

    return () => ctx2.current?.revert();
  }, [tl]);

  const addAnimation = useCallback(
    (animation: GSAPTimeline) => {
      tl && tl.add(animation, 0);
    },
    [tl]
  );

  return (
    <div ref={app}>
      <div className="relative h-screen bg-slate-700 img-trigger">
        <Logo />
        <BaseLine addAnimation={addAnimation} />
        {HeroImagesData.map((image, index) => (
          <HeroImages
            key={index}
            index={index}
            img={image.img}
            right={image.right}
            top={image.top}
            rotate={image.rotate}
            width={image.width}
            height={image.height}
            addAnimation={addAnimation}
          />
        ))}
      </div>
      <div className="pb-[500px]"></div>
    </div>
  );
};

export default Hero;
