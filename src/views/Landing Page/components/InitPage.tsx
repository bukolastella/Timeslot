import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const InitPage = () => {
  const app = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context>();

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          duration: 1,
        },
      });

      tl.to(".progress-line", {
        scaleX: 1,
        delay: 1,
      })
        .to(".progress-line", {
          opacity: 0,
          duration: 0.3,
        })
        .to(".sheet", {
          yPercent: gsap.utils.wrap([-100, 100]),
        })
        .to(".page-screen", {
          display: "none",
        });
    }, app);

    return () => ctx.current?.revert();
  }, []);

  return (
    <div ref={app}>
      <div className="fixed z-50 w-screen h-screen page-screen">
        <div className="relative h-screen overflow-hidden">
          <div className="absolute left-0 w-full bg-black h-1/2 sheet"></div>
          <div className="absolute top-0 bottom-0 left-0 z-10 w-full h-[2px] mx-0 my-auto origin-left scale-x-[0.01] bg-white progress-line"></div>
          <div className="absolute bottom-0 left-0 w-full bg-black h-1/2 sheet"></div>
        </div>
      </div>
    </div>
  );
};

export default InitPage;
