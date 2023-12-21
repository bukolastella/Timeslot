import { useLayoutEffect, useRef } from "react";
import BG6 from "../../../assets/logo.png";
import gsap from "gsap";

const MLX = 80;
const MLY = 80;
const H = 70;
const W = 200;
const InitTranslateX = 15;
const InitTranslateY = 65;

const Logo = () => {
  const app = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context>();

  useLayoutEffect(() => {
    ctx.current = gsap.context((self) => {
      gsap.set(".flair", {
        translateX: `${InitTranslateX}%`,
        translateY: `${InitTranslateY}%`,
      });

      //   events
      self.add("mousemove", (e: React.MouseEvent<HTMLDivElement>) => {
        const xValue = ((e.clientX - MLX) / W) * 45;
        const yValue = ((e.clientY - MLY) / H) * 35;

        gsap.set(".flair", {
          translateX: xValue,
          translateY: yValue,
        });
      });

      self.add("mouseleave", () => {
        gsap.to(".flair", {
          translateX: `${InitTranslateX}%`,
          translateY: `${InitTranslateY}%`,
        });
      });
    }, app);

    return () => ctx.current?.revert();
  }, []);

  const onMouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    ctx.current?.mousemove(e);
  };

  const onMouseLeaveHandler = () => {
    ctx.current?.mouseleave();
  };

  return (
    <div ref={app}>
      <div
        className={`mt-[${MLY}px] ml-[${MLX}px] w-[${W}px] h-[500px] inline-block bg-red-700  items-center justify-center cursor-pointer`}
        style={{
          width: `${W}px`,
          height: `${H}px`,
          marginLeft: `${MLX}px`,
          marginTop: `${MLY}px`,
        }}
        onMouseMove={onMouseMoveHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <img src={BG6} alt="" className="w-[150px] h-[30px] flair" />
      </div>
    </div>
  );
};

export default Logo;
