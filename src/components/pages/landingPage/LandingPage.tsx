import FollowUs from "./followUs/FollowUs";
import MultiItemCarousel from "./multiItemCarousel/MultiItemCarousel";
import SpecialOfferBanner from "./specialOffer/SpecialOfferBanner";
import Tops from "./tops/Tops";
import TrendingProducts from "./trendingProducts/TrendingProducts";
import Carousel from "./carousel/Carousel";
import { ToastContainer } from "react-toastify";

const LandingPage = () => {
  return (
    <>
      <Carousel />
      <TrendingProducts />
      <SpecialOfferBanner />
      <MultiItemCarousel />
      <Tops />
      <FollowUs />
    </>
  );
};
export default LandingPage;
