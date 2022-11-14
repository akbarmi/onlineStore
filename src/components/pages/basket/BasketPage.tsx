import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../../api/Agent";
import "./BasketPage.css";
import img1 from "../../../assets/images/01.jpg";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { addItem, removeItem } from "./basketSlice";
import { toast } from "react-toastify";

const BasketPage = () => {
  // const [loading, setLoading] = useState(true);
  const { basket } = useAppSelector((state) => state.basket);
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem("bs", JSON.stringify(basket));
  }, [basket]);

  const addItemHandler = async (product: any) => {
    if (user) {
      if (basket !== null && basket.length > 0) {
        const index = basket.findIndex((i) => i.product_id === product.id);
        if (index === -1 || index === undefined) {
          setLoading(true);
          const re = await agent.Basket.addItem({
            product_id: product.id,
            qty: 1,
          })
            .then(() => dispatch(addItem({ product, qty: 1 })))
            .finally(() => setLoading(false));
          // .then(() => agent.Basket.addItem(product))
        } else {
          setLoading(true);

          const qty = basket[index].qty + 1;
          const re = await agent.Basket.updateItem(product.id, qty)
            .then(() => dispatch(addItem({ product, qty })))
            .finally(() => setLoading(false));
        }
      } else {
        setLoading(true);

        const re = await agent.Basket.addItem({
          product_id: product.id,
          qty: 1,
        })
          .then(() => dispatch(addItem({ product, qty: 1 })))
          .finally(() => setLoading(false));
      }
    } else {
      if (basket !== null && basket.length > 0) {
        const index = basket.findIndex((i) => i.product_id === product.id);
        if (index === -1 || index === undefined) {
          setLoading(true);
          setTimeout(() => {
            dispatch(addItem({ product, qty: 1 }));
          }, 100);
          setLoading(false);
        } else {
          setLoading(true);
          setTimeout(() => {
            const qty = basket[index].qty + 1;
            dispatch(addItem({ product, qty }));
          }, 100);

          setLoading(false);
        }
      } else {
        setLoading(true);
        setTimeout(() => {
          dispatch(addItem({ product, qty: 1 }));
        }, 500);

        setLoading(false);
      }
    }
  };

  const removeItemHandler = async (product: any, quantity: number = 1) => {
    if (user) {
      if (basket !== null && basket.length > 0) {
        const index = basket.findIndex((i) => i.product_id === product.id);
        if (index === -1 || index === undefined) {
          return;
        } else {
          setLoading(true);
          const qty = basket[index].qty - quantity;
          if (qty !== 0) {
            const re = await agent.Basket.updateItem(product.id, qty)
              .then(() =>
                dispatch(
                  removeItem({ productId: product.id, quantity: quantity })
                )
              )
              .finally(() => {
                setLoading(false);
              });
          } else {
            const re = await agent.Basket.removeItem(product.id)
              .then(() =>
                dispatch(
                  removeItem({ productId: product.id, quantity: quantity })
                )
              )
              .finally(() => {
                toast.warn("از سبد شما حذف شد");
                setLoading(false);
              });
          }
        }
      } else {
        return;
      }
    } else {
      if (basket !== null && basket.length > 0) {
        const index = basket.findIndex((i) => i.product_id === product.id);
        if (index === -1 || index === undefined) {
          return;
        } else {
          setLoading(true);
          setTimeout(() => {
            dispatch(removeItem({ productId: product.id, quantity: quantity }));
          }, 300);

          setLoading(false);
        }
      } else {
        return;
      }
    }
  };

  if (basket === null || basket.length < 1)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center emptyBasket">
        <i className="bi bi-basket fs-1"></i>
        <h5>سبد شما خالی می&zwnj;باشد</h5>
      </div>
    );

  return (
    <>
      <div className="basketContainer">
        <div className="container px-3 m-auto ">
          <div className="d-flex justify-content-between pt-4">
            <h4>سبد خرید</h4>
            <nav className="basketdividerIcon" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item ">
                  <Link to={"/"} className="basketBreacrumbFont">
                    <i className="bi bi-house-door px-1 basketiconColor"></i>
                    صفحه اصلی
                  </Link>
                </li>
                <li className="breadcrumb-item " aria-current="page">
                  سبد خرید
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container px-3 m-auto">
        <div className="row row-cols-1 row-cols-lg-2 position-relative">
          <div className="col col-lg-8">
            {basket !== null
              ? basket!.map((i: any) => (
                  <div
                    className="d-flex flex-column flex-sm-row justify-content-between border-bottom "
                    key={i.product_id}
                  >
                    <div className="d-flex flex-column flex-sm-row align-items-center">
                      <img src={img1} alt="img1" className="basketImg me-3" />
                      <div className="d-flex flex-column justify-content-center align-items-center justify-content-md-start align-items-md-start p-2">
                        {/* <p className="basketItemTitle">{i.product.title}</p> */}
                        <p className="basketItemSize">
                          اندازه:
                          <span className="basketItemSizeQun">متوسط</span>
                        </p>
                        <p className="basketItemSize">
                          رنگ:
                          <span className="basketItemSizeQun">قرمز آبی</span>
                        </p>
                        <p className="basketItemPrice">245000 تومان</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center p-2">
                      <button
                        className="BasketdeleteBtn"
                        title="حذف محصول"
                        onClick={() => removeItemHandler(i.product, i.qty)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <div className="basketCounter">
                        <i
                          className="bi bi-plus-circle"
                          onClick={() => addItemHandler(i.product)}
                        ></i>
                        <label className="mt-1">
                          {loading ? (
                            <span
                              className="spinner-grow spinner-grow-sm text-bg-danger "
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : (
                            i.qty
                          )}
                        </label>
                        <i
                          className="bi bi-dash-circle"
                          onClick={() => removeItemHandler(i.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))
              : undefined}
          </div>
          <div className="col col-lg-4 basketTotalPrice shadow-sm d-flex flex-column justify-content-center align-items-center">
            <h5 className="fw-bolder">جمع کل</h5>
            <h5>254000 تومان</h5>
            <p className="postPrice">
              هزینه ارسال براساس میزان خرید و فاصله محاسبه خواهد شد.
            </p>
            <button className="basketbtnContinue">
              ادامه
              <i className="bi bi-patch-check"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default BasketPage;
