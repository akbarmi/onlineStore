import "./Tops.css";
import img1 from "../../../../assets/images/1.jpg";
import img2 from "../../../../assets/images/2.jpg";
import img3 from "../../../../assets/images/3.jpg";
import img4 from "../../../../assets/images/4.jpg";
import img5 from "../../../../assets/images/5.jpg";
import img6 from "../../../../assets/images/6.jpg";
import img7 from "../../../../assets/images/7.jpg";
import img8 from "../../../../assets/images/8.jpg";
import img9 from "../../../../assets/images/9.jpg";
import img10 from "../../../../assets/images/10.jpg";
import img11 from "../../../../assets/images/11.jpg";
import img12 from "../../../../assets/images/12.jpg";

const Tops = () => {
  return (
    <div className="container px-3 mx-auto ">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 px-0 mx-0">
        <div className="col mt-5">
          <h5 className="fw-bolder ">محبوب&zwnj;ترین محصولات</h5>
          <div>
            <div className="d-flex mt-3 border-bottom">
              <div>
                <img src={img1} alt="" className="imgstlye" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center ms-2 ">
                <h6 className="fw-bolder textHeader">هدست سیمی</h6>
                <p className="p-0 m-0 textColor">200,000 تومان</p>
              </div>
            </div>

            <div className="d-flex  mt-3 border-bottom">
              <div>
                <img src={img2} alt="" className="imgstlye" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center ms-2">
                <h6 className="fw-bolder textHeader">دوربین امنیتی ابری</h6>
                <p className="p-0 m-0 textColor">1,200,000 تومان</p>
              </div>
            </div>

            <div className="d-flex  mt-3 border-bottom">
              <div>
                <img src={img3} alt="" className="imgstlye" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center ms-2">
                <h6 className="fw-bolder textHeader">گوشی هوشمند S10</h6>
                <p className="p-0 m-0 textColor">10,550,000 تومان</p>
              </div>
            </div>

            <div className="d-flex  mt-3">
              <div>
                <img src={img4} alt="" className="imgstlye" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center ms-2">
                <h6 className="fw-bolder textHeader">گیرنده تلوزیونی هوشمند</h6>
                <p className="p-0 m-0 textColor">650,000 تومان</p>
              </div>
            </div>
            <div>...</div>
            <div className="mt-2">
              <a href="" className="moreProducts">
                نمایش بیشتر
                <i className="bi bi-chevron-left ms-2"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col mt-5">
          <h5 className="fw-bolder">جدیدترین محصولات </h5>
          <div>
            <div className="d-flex mt-3 border-bottom">
              <div>
                <img src={img5} alt="" className="imgstlye" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center ms-2">
                <h6 className="fw-bolder textHeader">مانیتور 21 اینچی آی مک</h6>
                <p className="p-0 m-0 textColor">8,200,000 تومان</p>
              </div>
            </div>

            <div className="d-flex mt-3 border-bottom">
              <div>
                <img src={img6} alt="" className="imgstlye" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center ms-2">
                <h6 className="fw-bolder textHeader">پرینتر لیزری الجی</h6>
                <p className="p-0 m-0 textColor">12,040,000 تومان</p>
              </div>
            </div>

            <div className="d-flex  mt-3 border-bottom">
              <div>
                <img src={img7} alt="" className="imgstlye" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center ms-2">
                <h6 className="fw-bolder textHeader">دسته بازی سونی</h6>
                <p className="p-0 m-0 textColor">4,400,000 تومان</p>
              </div>
            </div>

            <div className="d-flex  mt-3">
              <div>
                <img src={img8} alt="" className="imgstlye" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center ms-2">
                <h6 className="fw-bolder textHeader">ساعت هوشمند آی واچ</h6>
                <p className="p-0 m-0 textColor">9,900,000 تومان</p>
              </div>
            </div>
            <div>...</div>
            <div className="mt-2">
              <a href="" className="moreProducts">
                نمایش بیشتر
                <i className="bi bi-chevron-left ms-2"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col mt-5">
          <h5 className="fw-bolder">بهترین فروشندگان</h5>
          <div>
            <div className="d-flex mt-3 border-bottom">
              <div>
                <img src={img9} alt="" className="imgstlye" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center ms-2">
                <h6 className="fw-bolder textHeader">گوشی هوشمند سامسونگ</h6>
                <p className="p-0 m-0 textColor">8,200,000 تومان</p>
              </div>
            </div>

            <div className="d-flex  mt-3 border-bottom">
              <div>
                <img src={img10} alt="" className="imgstlye" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center ms-2">
                <h6 className="fw-bolder textHeader">
                  هدست بی&zwnj;سیم و بلوتوثی
                </h6>
                <p className="p-0 m-0 textColor">1,400,000 تومان</p>
              </div>
            </div>

            <div className="d-flex  mt-3 border-bottom">
              <div>
                <img src={img11} alt="" className="imgstlye" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center ms-2">
                <h6 className="fw-bolder">دوربین 360 امنیتی</h6>
                <p className="p-0 m-0 textColor">990,000 تومان</p>
              </div>
            </div>

            <div className="d-flex  mt-3">
              <div>
                <img src={img12} alt="" className="imgstlye" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center ms-2">
                <h6 className="fw-bolder textHeader">دوربین دیجیتالی 40MP</h6>
                <p className="p-0 m-0 textColor">1,200,000 تومان</p>
              </div>
            </div>
            <div>...</div>
            <div className="mt-2">
              <a href="" className="moreProducts">
                نمایش بیشتر
                <i className="bi bi-chevron-left ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tops;
