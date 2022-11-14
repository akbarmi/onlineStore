import "./SpecialOfferBanner.css";
import img from "../../../../assets/images/offer.png";
import Countdown from "react-countdown";
interface CounterType {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}
const SpecialOfferBanner = () => {
  const Completionist = () => <span>تخفیف تمام شد!</span>;

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CounterType) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <div className="d-flex justify-content-center">
          <div className="counter1">{seconds}</div>:
          <div className="counter1">{minutes}</div>:
          <div className="counter1">{hours}</div>:
          <div className="counter1">{days}</div>
        </div>
      );
    }
  };
  return (
    <div className="container px-3 m-auto pb-2">
      <div className="bannerContainer py-2 p-lg-5 d-flex flex-column flex-lg-row justify-content-center align-items-center">
        <div className=" d-flex flex-column justify-content-center align-items-center mt-5 mt-lg-0">
          <h5 className="redBg fs-6">تخفیف ویژه محدود</h5>
          <h1 className="textWidth">پیشنهادات ویژه</h1>
          <p>تمامی مدل&zwnj;های ipad اپل</p>
          <a href="" className="btnOffers mt-3">
            مشاهده پیشنهادات
            <i className="bi bi-chevron-left"></i>
          </a>
          <h2 className="mt-4">
            <Countdown date={Date.now() + 5000000000} renderer={renderer} />
          </h2>
        </div>
        <div className=" d-flex justify-content-center">
          <img src={img} className="imageResponsive" alt="" />
        </div>
      </div>
    </div>
  );
};
export default SpecialOfferBanner;
