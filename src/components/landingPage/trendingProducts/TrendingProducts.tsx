import Card from "../../utilities/Card/Card";
import "./TrendingProducts.css";

const TrendingProducts = () => {
  return (
    <div className="container px-3 m-auto">
      <div className="d-flex justify-content-between mt-4">
        <span className="fs-4 fw-bolder ">محصولات پرطرفدار</span>
        <a href="" className="btn btnMoreProducts">
          محصولات بیشتر
          <i className="bi bi-chevron-left iconStyle"></i>
        </a>
      </div>
      <hr />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mx-0 px-0">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
export default TrendingProducts;
