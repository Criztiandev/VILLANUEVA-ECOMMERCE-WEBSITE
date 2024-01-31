import React from "react";
import Topbar from "../layout/Topbar";
import HeroSection from "../containers/HeroSection";
import CategorySection from "../containers/CategorySection";
import FeatureSection from "../containers/FeaturedSection";
import ServiceSection from "../containers/ServiceSection";
import CallToAction from "../containers/CallToAction";
import Chatbot from "../containers/Chatbot";
import Footer from "../layout/Footer";

const LandingPage = () => {
  return (
    <div className="bg-white">
      <Topbar />
      <main className="overflow-hidden pb-4">
        <HeroSection />
        <FeatureSection />
        <CategorySection />
        <ServiceSection />
        <CallToAction />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default LandingPage;
