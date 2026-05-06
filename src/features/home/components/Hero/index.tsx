import { HeroContent } from "./HeroContent";
import { HeroImage } from "./HeroImage";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroImage />
      <div className="absolute inset-0 bg-primary/50 z-1" />
      <div className="relative z-10 w-full text-bg pt-20">
        <HeroContent />
      </div>
    </section>
  );
};

export default Hero;