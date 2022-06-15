import img from "../../../assets/images/13.jpg";
import "./Card.css";
const Card = () => {
  return (
    <div className="card_ col">
      <div className="body_">
        <img className="image" src={img}></img>
        <div className="px-3 pt-0 pb-1">
          <h1>تی شرت مردانه مدل آفریقایی</h1>
          <div className="d-flex justify-content-between">
            <h2>موجود در انبار</h2>
            <h3>200,000 تومان</h3>
          </div>
          <div className="informations">
            <p>مناسب برای نوجوانان</p>
            <button className="btnAddCart">
              افزودن به سبد
              <i className="bi bi-cart3 "></i>
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
