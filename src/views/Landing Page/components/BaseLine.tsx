import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const BaseLine = () => {
  const app = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context>();

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 5,
        },
      });

      tl.to(".base-text ", {
        xPercent: -100,
      }).to(
        ".base-text ",
        {
          opacity: 0,
          duration: 1.5,
        },
        "<30%"
      );
    }, app);

    return () => ctx.current?.revert();
  }, []);

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 flex items-center overflow-hidden text-right text-white px-14 text-9xl"
      ref={app}
    >
      <span className="whitespace-nowrap base-text">
        A new way of designing, discovering, and sharing time.
      </span>
    </div>
  );
};

export default BaseLine;
