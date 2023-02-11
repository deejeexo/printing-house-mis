import FAQSection from "../components/LandingPage/FAQSection";
import FeatureSection from "../components/LandingPage/FeatureSection";
import FeedbackSection from "../components/LandingPage/FeedbackSection";
import Footer from "../components/LandingPage/Footer";
import MainSection from "../components/LandingPage/MainSection";
import StatsSection from "../components/LandingPage/StatsSection";

function ClientPage() {
  return (
    <div className="animate-ping-short">
      <MainSection></MainSection>
      <hr></hr>
      <FeatureSection></FeatureSection>
      <hr></hr>
      <StatsSection></StatsSection>
      <hr></hr>
      <FeedbackSection></FeedbackSection>
      <hr></hr>
      <FAQSection></FAQSection>
      <hr></hr>
      <Footer></Footer>
    </div>
  );
}

export default ClientPage;
