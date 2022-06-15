import temp1 from "../../../assets/images/04.jpg";
import temp2 from "../../../assets/images/05.jpg";
import temp3 from "../../../assets/images/06.jpg";
import banner1 from "../../../assets/images/banner-sm01.png";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./Carousel.css";

const Carousel = () => {
  return (
    <div className="Wrapper_">
      <div className="container d-flex flex-column flex-xl-row justify-content-xl-between justify-content-center px-3 m-auto">
        <div
          id="carouselExampleCaptions"
          className="carousel slide carouselWidth "
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="innerContainer d-flex flex-column flex-md-row  ">
                <div className="imageContainer">
                  <img src={temp1} alt="..." />
                </div>
                <div className="textContainer">
                  <h3 className="textAnimationOne">
                    جدیدترین ابزار واقعیت مجازی
                  </h3>
                  <p className="textAnimationTwo">
                    با این عینک واقعیت مجازی پیشرو باشید در جهان
                  </p>
                  <button className="btn btn-sm textAnimationThreeZoomIn buttonPrimary">
                    خرید
                    <i className="bi bi-chevron-left iconStyle"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="innerContainer d-flex flex-column flex-md-row">
                <div className="imageContainer">
                  <img src={temp2} alt="..." />
                </div>
                <div className="textContainer">
                  <h3 className="textAnimationZoomInOne">
                    جدیدترین ابزار واقعیت مجازی
                  </h3>
                  <p className="textAnimationZoomInOne">
                    با این عینک واقعیت مجازی پیشرو باشید در جهان
                  </p>
                  <button className="btn btn-sm textAnimationThreeZoomIn buttonPrimary">
                    خرید
                    <i className="bi bi-chevron-left iconStyle"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="innerContainer d-flex flex-column flex-md-row">
                <div className="imageContainer">
                  <img src={temp3} alt="..." />
                </div>
                <div className="textContainer">
                  <h3 className="textAnimationFadeInUpOne">
                    جدیدترین ابزار واقعیت مجازی
                  </h3>
                  <p className="textAnimationFadeInUpTwo">
                    با این عینک واقعیت مجازی پیشرو باشید در جهان
                  </p>
                  <button className="btn btn-sm textAnimationThreeZoomIn buttonPrimary">
                    خرید
                    <i className="bi bi-chevron-left iconStyle"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button> */}
        </div>
        <div className="d-flex flex-xl-column flex-row justify-content-lg-center   overflow-auto">
          <div className="d-flex bannerOne">
            <div className="bannerText d-flex flex-column m-auto p-2">
              <span className="fs-6 fw-bolder">دوربین نسل جدید</span>
              <a href="" className="btn btn-sm buyButtonBlue">
                خرید
                <i className="bi bi-chevron-left"></i>
              </a>
            </div>
            <div className="">
              <img src={banner1} width="110px" alt="..." />
            </div>
          </div>
          <div className="d-flex bannerTwo">
            <div className="bannerText d-flex flex-column m-auto p-2">
              <span className="fs-6 fw-bolder">دوربین نسل جدید</span>
              <span className="fs-6 fw-lighter">دوربین 360 درجه</span>
              <a href="" className="btn btn-sm buyButtonGreen">
                خرید
                <i className="bi bi-chevron-left"></i>
              </a>
            </div>
            <div className="">
              <img src={banner1} width="110px" alt="..." />
            </div>
          </div>
          <div className="d-flex bannerThree">
            <div className="bannerText d-flex flex-column m-auto p-2">
              <span className="fs-6 fw-bolder">دوربین نسل جدید</span>
              <a href="" className="btn btn-sm buyButtonYellow">
                خرید
                <i className="bi bi-chevron-left"></i>
              </a>
            </div>
            <div className="">
              <img src={banner1} width="110px" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Carousel;
