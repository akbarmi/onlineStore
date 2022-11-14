import "./Footer.css";
import akbar from "../../assets/icons/akbarmirzaei.svg";

const Footer = () => {
  return (
    <div className="FooterWrapper">
      <div className="container px-3 m-auto ">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 py-5 px-0 mx-0 FooterBorderColor">
          <div className="col d-flex">
            <div className="">
              <i className="bi bi-truck FooterIconStyle"></i>
            </div>
            <div>
              <h6>تحویل سریع و رایگان</h6>
              <p className="FooterDescription">
                برای خریدهای بالای 300هزار تومن به صورت رایگان ارسال میشود
              </p>
            </div>
          </div>
          <div className="col d-flex">
            <div className="">
              <i className="bi bi-fingerprint FooterIconStyle"></i>
            </div>
            <div>
              <h6>پرداخت امن آنلاین</h6>
              <p className="FooterDescription">
                برای خریدهای بالای 300هزار تومن به صورت رایگان ارسال میشود
              </p>
            </div>
          </div>
          <div className="col d-flex  ">
            <div className="">
              <i className="bi bi-currency-dollar FooterIconStyle"></i>
            </div>
            <div>
              <h6>گارانتی برگشت وجه</h6>
              <p className="FooterDescription">
                برای خریدهای بالای 300هزار تومن به صورت رایگان ارسال میشود
              </p>
            </div>
          </div>
          <div className="col d-flex">
            <div className="">
              <i className="bi bi-headset FooterIconStyle"></i>
            </div>
            <div>
              <h6>پشتیبانی 7/24</h6>
              <p className="FooterDescription">
                برای خریدهای بالای 300هزار تومن به صورت رایگان ارسال میشود
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center pt-4 pb-2">
          <p className="FooterAllrights">
            © {new Date().getFullYear()} تمامی حقوق مادی و معنوی این وب سایت
            متعلق به فروشگاه فلامینگو مارکتس می&zwnj;باشد.
          </p>
          <p className="FooterAllrights">
            طراحی شده توسط گروه
            <a
              href="https://www.linkedin.com/in/akbar-mirzaei-90854787/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={akbar} alt="" width={40} />
            </a>
            {/* <span> </span>و پ.ق */}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
