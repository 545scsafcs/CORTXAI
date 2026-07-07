import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/LandingSections/Features";
import AIAgents from "../../components/LandingSections/AIAgents";
import Stats from "../../components/LandingSections/Stats";
import Pricing from "../../components/LandingSections/Pricing";
import CTA from "../../components/LandingSections/CTA";
import FooterCTA from "../../components/LandingSections/FooterCTA";

export default function LandingPage() {
  return (
    <div className="bg-[#050816] min-h-screen text-white overflow-x-hidden">

      <Navbar />

      <Hero />

      <Features />

      <AIAgents />

      <Stats />

      <Pricing />

      <CTA />

      <FooterCTA />

    </div>
  );
}