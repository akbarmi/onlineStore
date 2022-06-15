import "./Footer.css";

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
          <div className="col d-flex justify-content-center ">
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
        <div>
          <p>
            تمام حقوق اين وب‌سايت متعلق به اکبر میرزایی (فرانت) و پیمان قادری
            (بک) است.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
