import "./App.css";
import InfoHeader from "./components/header/info/InfoHeader";
import NavBar from "./components/header/navbar/NavBar";
import Carousel from "./components/landingPage/carousel/Carousel";
import SpecialOfferBanner from "./components/landingPage/specialOffer/SpecialOfferBanner";
import TrendingProducts from "./components/landingPage/trendingProducts/TrendingProducts";
import MultiItemCarousel from "./components/landingPage/multiItemCarousel/MultiItemCarousel";
import Tops from "./components/landingPage/tops/Tops";
import FollowUs from "./components/landingPage/followUs/FollowUs";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div>
      <InfoHeader />
      <NavBar />
      <Carousel />
      <TrendingProducts />
      <SpecialOfferBanner />
      <MultiItemCarousel />
      <Tops />
      <FollowUs />
      <Footer />
    </div>
  );
}

export default App;
