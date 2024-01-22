import AddToCart from "../containers/AddToCart";
import Header from "../containers/Header";
import HeroSection from "../containers/HeroSection";
import FeatureSection from "../containers/FeatureSection";
import Footer from "../containers/Footer";
import CategorySection from "../containers/CategorySection";
import ServiceSection from "../containers/ServiceSection";
import CallToAction from "../containers/CallToAction";
import Chatbot from "../containers/Chatbot";

const LandingPage = () => {
  return (
    <div className="bg-white">
      <Header />
      <AddToCart />
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
