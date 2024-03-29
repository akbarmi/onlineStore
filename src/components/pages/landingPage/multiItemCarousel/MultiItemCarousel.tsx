import Slider from "react-slick";
import "./MultiItemCarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo1 from "../../../../assets/logo/1.png";
import logo2 from "../../../../assets/logo/2.png";
import logo3 from "../../../../assets/logo/3.png";
import logo4 from "../../../../assets/logo/4.png";
import logo5 from "../../../../assets/logo/5.png";
import logo6 from "../../../../assets/logo/6.png";
import logo7 from "../../../../assets/logo/7.png";
import logo8 from "../../../../assets/logo/8.png";

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div className="leftArrow" onClick={onClick}>
      <i className="bi bi-chevron-left lefticonStyle"></i>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div className="rightArrow" onClick={onClick}>
      <i className="bi bi-chevron-right righticonStyle"></i>
    </div>
  );
}

const MultiItemCarousel = () => {
  const settings = {
    dots: false,

    infinite: true,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    // autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container px-3 mx-auto  mt-4 mb-5">
      <Slider {...settings}>
        <div>
          <div className="itemStyle">
            <img src={logo1} alt="" />
          </div>
        </div>
        <div>
          <div className="itemStyle">
            <img src={logo2} alt="" />
          </div>
        </div>
        <div>
          <div className="itemStyle">
            <img src={logo3} alt="" />
          </div>
        </div>
        <div>
          <div className="itemStyle">
            <img src={logo4} alt="" />
          </div>
        </div>
        <div>
          <div className="itemStyle">
            <img src={logo5} alt="" />
          </div>
        </div>
        <div>
          <div className="itemStyle">
            <img src={logo6} alt="" />
          </div>
        </div>
        <div>
          <div className="itemStyle">
            <img src={logo7} alt="" />
          </div>
        </div>
        <div>
          <div className="itemStyle">
            <img src={logo8} alt="" />
          </div>
        </div>
      </Slider>
    </div>
  );
};
export default MultiItemCarousel;
