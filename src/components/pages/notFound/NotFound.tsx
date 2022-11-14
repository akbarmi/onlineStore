import { useNavigate } from "react-router-dom";
import notfound from "../../../assets/images/notfound.svg";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfoundContainer">
      <div className="container m-auto  px-3">
        <div className="row row-cols-1 row-cols-md-2 my-5">
          <div className="col d-flex justify-content-center justify-content-md-end align-items-center">
            <div className="">
              <img src={notfound} alt="" className="imgStyle" />
            </div>
          </div>
          <div className="col d-flex justify-content-center justify-content-md-start align-items-center">
            <div className="">
              <h2>خطای 404</h2>
              <h2>صفحه مورد نظر یافت نشد</h2>
              <button
                className="mt-5 notfoundButton"
                onClick={() => navigate("/")}
              >
                برگرد صفحه اصلی
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
