import { useAppSelector } from "../../../../store/store";
import Card from "../../../utilities/Card/Card";
import ProductListCard from "../../../utilities/Card/productListCard/ProductListCard";
import "./TrendingProducts.css";

const TrendingProducts = () => {
  const { data } = useAppSelector((state) => state.productList.trendProducts);
  let selectedData: any = [];
  if (data.length > 10) selectedData = data.slice(0, 10);
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
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 mx-0 px-0 pb-5 centerInSmSize">
        {data.length > 0 ? (
          selectedData.map((i: any) => (
            <ProductListCard key={i.id} product={i} />
          ))
        ) : (
          <div>محصولی در این دسته بندی موجود نیست</div>
        )}
        {/* <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> */}
      </div>
    </div>
  );
};
export default TrendingProducts;
