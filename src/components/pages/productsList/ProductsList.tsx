import { Link, useParams } from "react-router-dom";
import "./ProductsList.css";
import img1 from "../../../assets/images/01.jpg";
import img2 from "../../../assets/images/02.jpg";
import img3 from "../../../assets/images/03.jpg";
import img4 from "../../../assets/images/13.jpg";
import ProductListCard from "../../utilities/Card/productListCard/ProductListCard";
import agent from "../../../api/Agent";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getSearchedProducts } from "./producsListSlice";
import LoadingComponent from "../loadingComponent/LoadingComponent";

const ProductsList = () => {
  const paginitionSelector = useAppSelector((state) => state.productList.pages);
  const { current_page, per_page, total, data } = useAppSelector(
    (state) => state.productList.searchedFilterdProducts
  );
  const dispatch = useAppDispatch();

  const { category } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getSearchedProducts(category!)).finally(() => setLoading(false));
  }, [category]);
  return (
    <>
      <div className="managementContainer">
        <div className="container px-3 m-auto ">
          <div className="d-flex justify-content-between pt-4">
            <h4>محصولات</h4>
            <nav className="PLdividerIcon" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item ">
                  <Link to={"/"} className="PLBreacrumbFont">
                    <i className="bi bi-house-door px-1 PLiconColor"></i>
                    صفحه اصلی
                  </Link>
                </li>
                <li className="breadcrumb-item " aria-current="page">
                  محصولات
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container px-3 m-auto">
        <div className="row row-cols-1 row-cols-lg-2  m-auto">
          <div className="col col-lg-3 PLFilter shadow-sm d-flex flex-column justify-content-center align-items-center">
            فیلتر
          </div>
          {loading ? (
            <LoadingComponent />
          ) : (
            <div className="col col-lg-9">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 mx-0 px-0 pt-2 pb-2">
                {data.length > 0 ? (
                  data.map((i) => <ProductListCard key={i.id} product={i} />)
                ) : (
                  <div>محصولی در این دسته بندی موجود نیست</div>
                )}
              </div>
              {paginitionSelector.length > 1 ? (
                <div className="d-flex justify-content-center w-100 border-top p-3">
                  <button
                    className="pagination paginationLR"
                    onClick={() => {
                      setLoading(true);
                      dispatch(
                        getSearchedProducts(
                          `${category}?page=${current_page - 1}`
                        )
                      ).finally(() => setLoading(false));
                    }}
                    disabled={current_page === 1 ? true : false}
                  >
                    <i className="bi bi-chevron-right paginationIcon "></i>
                  </button>
                  <>
                    {paginitionSelector.map((i) => (
                      <span
                        key={i}
                        className={
                          current_page === i ? "paginationActive" : "pagination"
                        }
                        onClick={() => {
                          setLoading(true);
                          dispatch(
                            getSearchedProducts(`${category}?page=${i}`)
                          ).finally(() => setLoading(false));
                        }}
                      >
                        {i}
                      </span>
                    ))}
                  </>
                  <button
                    className="pagination paginationLR"
                    onClick={() => {
                      setLoading(true);
                      dispatch(
                        getSearchedProducts(
                          `${category}?page=${current_page + 1}`
                        )
                      ).finally(() => setLoading(false));
                    }}
                    disabled={
                      current_page === Math.ceil(total / per_page)
                        ? true
                        : false
                    }
                  >
                    <i className="bi bi-chevron-left paginationIcon "></i>
                  </button>
                </div>
              ) : (
                <div className="pt-5"></div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ProductsList;
