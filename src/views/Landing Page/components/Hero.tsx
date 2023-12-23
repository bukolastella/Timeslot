import Logo from "./Logo";
import { HeroImagesData } from "./data";
import HeroImages from "./HeroImages";
import BaseLine from "./BaseLine";

const Hero = () => {
  return (
    <div className="relative h-screen bg-slate-700">
      <Logo />
      <BaseLine />
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
        />
      ))}
    </div>
  );
};

export default Hero;
