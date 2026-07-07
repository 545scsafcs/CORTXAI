import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroOrb from "./HeroOrb";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

  <HeroBackground />

  <div className="relative z-10 max-w-7xl mx-auto
  px-8 lg:px-16
  pt-36
  grid lg:grid-cols-2
  items-center">

    <HeroContent />

    <div className="flex justify-center mt-16 lg:mt-0">

      <HeroOrb />

    </div>

  </div>

</section>
  );
}