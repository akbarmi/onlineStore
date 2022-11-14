import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../../api/Agent";
import img from "../../../assets/images/13.jpg";
import { useAppSelector } from "../../../store/store";
import "./Card.css";
const Card = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.account);
  const { basket } = useAppSelector((state) => state.basket);

  const addItemHandler = async (id: number) => {
    setLoading(true);
    const r = await agent.Basket.getBasket();
    if (user) {
      if (basket !== null && basket.length > 0) {
        const index = basket.findIndex((i) => i.product_id === id);
        if (index === -1 || index === undefined) {
          agent.Basket.addItem(id);
        } else {
        }
      } else {
      }

      const re = await agent.Basket.addItem({ product_id: 38, qty: 1 }).finally(
        () => setLoading(false)
      );
    } else {
    }
    // agent.Basket.addItem(productId)
    //   .catch((error: any) => console.error(error))
    //   .finally(() => setLoading(false));
  };
  return (
    <div className="card_ col">
      <div className="body_">
        <Link to="/productsList/111">
          <img className="image" src={img}></img>
        </Link>
        <div className="px-3 pt-0 pb-1">
          <Link to="/productsList/111" className="text-decoration-none">
            <h1>تی شرت مردانه مدل آفریقایی</h1>
          </Link>
          <div className="d-flex justify-content-between">
            <h2>موجود در انبار</h2>
            <h3>200,000 تومان</h3>
          </div>
          <div className="informations">
            <p>مناسب برای نوجوانان</p>
            <button className="btnAddCart">
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
  );
};
export default Card;
