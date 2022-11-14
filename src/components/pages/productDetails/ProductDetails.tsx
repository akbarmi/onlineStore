import { useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../../models/types";
import Loading from "../../utilities/loading/Loading";
import NotFound from "../notFound/NotFound";
import "./ProductDetails.css";
import ImageGallery from "react-image-gallery";
import "./ProductDetails.css";
import { Link } from "react-router-dom";
import mg1 from "../../../assets/images/D01.jpg";
import mg2 from "../../../assets/images/D02.jpg";
import mg3 from "../../../assets/images/D03.jpg";
import mg4 from "../../../assets/images/D04.jpg";
// import "react-image-gallery/styles/css/image-gallery.css";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const images = [
    {
      original: `${mg1}`,
      thumbnail: `${mg1}`,
    },
    {
      original: `${mg2}`,
      thumbnail: `${mg2}`,
    },
    {
      original: `${mg3}`,
      thumbnail: `${mg3}`,
    },
    {
      original: `${mg4}`,
      thumbnail: `${mg4}`,
    },
  ];

  return (
    <>
      <div className="managementContainer">
        <div className="container px-3 m-auto ">
          <div className="d-flex justify-content-between pt-4">
            <h4 className="">جزئیات محصول</h4>
            <nav className="basketdividerIcon" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item ">
                  <Link to={"/"} className="basketBreacrumbFont">
                    <i className="bi bi-house-door px-1 basketiconColor"></i>
                    صفحه اصلی
                  </Link>
                </li>
                <li className="breadcrumb-item " aria-current="page">
                  جزئیات محصول
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container px-3 m-auto ">
        <div className="managementBox shadow-sm row m-auto">
          <ul
            className="nav nav-tabs navBorder py-2"
            id="productdetailTab"
            role="tablist"
          >
            <li className="nav-item " role="presentation">
              <a
                className="nav-link active d-flex justify-content-center align-items-center"
                id="generalInfo-tab"
                data-bs-toggle="tab"
                data-bs-target="#generalInfo"
                type="button"
                role="tab"
                aria-controls="generalInfo"
                aria-selected="true"
              >
                <p className="m-0 p-0">اطلاعات کلی</p>
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link d-flex justify-content-center align-items-center"
                id="detailInfo-tab"
                data-bs-toggle="tab"
                data-bs-target="#detailInfo"
                type="button"
                role="tab"
                aria-controls="detailInfo"
                aria-selected="false"
              >
                <p className="m-0 p-0">اطلاعات تکمیلی</p>
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link d-flex justify-content-center align-items-center"
                id="reviews-tab"
                data-bs-toggle="tab"
                data-bs-target="#reviews"
                type="button"
                role="tab"
                aria-controls="reviews"
                aria-selected="false"
              >
                <p className="m-0 p-0">نظرات (25)</p>
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active p-4"
              id="generalInfo"
              role="tabpanel"
              aria-labelledby="generalInfo-tab"
            >
              <div className="row">
                <div className="col-12 col-lg-7 ">
                  <ImageGallery
                    items={images}
                    isRTL={true}
                    showPlayButton={false}
                  />
                </div>
                <hr className="mt-3 mt-lg-0 d-lg-none" />
                <div className="col-12 col-lg-5 px-lg-5">
                  <div>
                    <span>قیمت:</span>
                    <span className="PDpriceStyle ms-3">20000</span>
                    <span className="PDtoman"> تومان</span>
                  </div>
                  <div className="pt-3">
                    <div className=" d-flex">
                      <span className="">رنگ: </span>
                      <select
                        name="color"
                        id="#colorlist"
                        className=" form-select form-select-sm PDtoman ms-3 selectInputShadow"
                      >
                        <option selected>رنگ مورد نظر را انتخاب کنید</option>
                        <option value="سفید">سفید</option>
                        <option value="سبز">سبز</option>
                      </select>
                    </div>
                    <div className="col"></div>
                  </div>
                  <div className="pt-3">
                    <span>ویژگی&zwnj;ها:</span>
                  </div>
                  <div className="pt-3">
                    <button className="PDbtnaddbasket w-100">
                      افزودن به سبد
                    </button>
                  </div>
                  <div className="pt-3 d-flex ">
                    <button className="PDbtn me-2">
                      <i className="bi bi-clipboard-heart"> </i>
                      افزودن به علاقمندی&zwnj;ها
                    </button>
                    <button className="PDbtn">
                      <i className="bi bi-terminal-split"> </i>
                      مقایسه
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="detailInfo"
              role="tabpanel"
              aria-labelledby="detailInfo-tab"
            >
              detailinfo
            </div>
            <div
              className="tab-pane fade"
              id="reviews"
              role="tabpanel"
              aria-labelledby="reviews-tab"
            >
              reviewsss
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
