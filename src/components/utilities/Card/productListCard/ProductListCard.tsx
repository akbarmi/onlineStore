import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "../../../../api/Agent";
import img from "../../../../assets/images/60.jpg";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { addItem } from "../../../pages/basket/basketSlice";
import "./ProductListCard.css";
import "../Card.css";
const ProductListCard = (props: any) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.account);
  const { basket } = useAppSelector((state) => state.basket);
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
            .finally(() => {
              toast.success("به سبد افزوده شد");
              setLoading(false);
            });
          // .then(() => agent.Basket.addItem(product))
        } else {
          setLoading(true);

          const qty = basket[index].qty + 1;
          const re = await agent.Basket.updateItem(product.id, qty)
            .then(() => dispatch(addItem({ product, qty })))
            .finally(() => {
              toast.success("به سبد افزوده شد");
              setLoading(false);
            });
        }
      } else {
        setLoading(true);

        const re = await agent.Basket.addItem({
          product_id: product.id,
          qty: 1,
        })
          .then(() => dispatch(addItem({ product, qty: 1 })))
          .finally(() => {
            toast.success("به سبد افزوده شد");
            setLoading(false);
          });
      }
    } else {
      if (basket !== null && basket.length > 0) {
        const index = basket.findIndex((i) => i.product_id === product.id);
        if (index === -1 || index === undefined) {
          setLoading(true);
          setTimeout(() => {
            dispatch(addItem({ product, qty: 1 }));
            toast.success("به سبد افزوده شد");
            setLoading(false);
          }, 200);
        } else {
          setLoading(true);
          setTimeout(() => {
            const qty = basket[index].qty + 1;
            dispatch(addItem({ product, qty }));
            toast.success("به سبد افزوده شد");
            setLoading(false);
          }, 200);
        }
      } else {
        setLoading(true);
        setTimeout(() => {
          dispatch(addItem({ product, qty: 1 }));
          toast.success("به سبد افزوده شد");
          setLoading(false);
        }, 200);
      }
    }
  };

  return (
    <>
      <div className="PLcard_ col">
        <div className="PLbody_">
          <Link to="/productsList/productDetail/111">
            <div className="PLimgWrapper">
              <img
                className="image"
                src={
                  props.product.short_images.length > 0
                    ? props.product.short_images[0]
                    : img
                }
              ></img>
            </div>
          </Link>
          <div className="px-3 pt-0 pb-1">
            <Link
              to="/productsList/productDetail/"
              className="text-decoration-none"
            >
              <h1>{props.product.title}</h1>
            </Link>
            <div className="d-flex justify-content-between">
              <h2>موجود در انبار</h2>
              <div className="d-flex">
                <h3>
                  {props.product.price ? props.product.price : "200,000 تومان"}
                </h3>
                <i className="unit">تومان</i>
              </div>
            </div>
            <div className="informations">
              <p>مناسب برای نوجوانان</p>
              <button
                className="btnAddCart"
                onClick={() => addItemHandler(props.product)}
                disabled={loading}
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <>
                    افزودن به سبد
                    <i className="bi bi-cart3 "></i>
                  </>
                )}
              </button>
              <button className="btnQuickView">
                نمایش سریع
                <i className="bi bi-eye"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="d-sm-none" />
    </>
  );
};
export default ProductListCard;
