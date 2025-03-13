import {
  HeroSection,
  ProductSection,
  FeatureProductSection,
  SubcriptionSection,
} from "./_components";
import FeatureSection from "./_components/feature-section";
import RatingSection from "./_components/rating-section";

const HomePage = async () => {
  return (
    <>
      <HeroSection />
      <ProductSection />
      <FeatureProductSection />
      <FeatureSection />
      <RatingSection />
      <SubcriptionSection />
    </>
  );
};

export default HomePage;
