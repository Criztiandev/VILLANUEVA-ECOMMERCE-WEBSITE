import HeroSection from "./containers/HeroSection";
import FeatureSection from "./containers/FeatureSection";
import CategorySection from "./containers/CategorySection";
import ServiceSection from "./containers/ServiceSection";
import CallToAction from "./containers/CallToAction";
import Chatbot from "./containers/Chatbot";
import Topbar from "../../layout/Topbar";
import Footer from "../../layout/Footer";

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
