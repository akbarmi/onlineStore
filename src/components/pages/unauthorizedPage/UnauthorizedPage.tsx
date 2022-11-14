import "./UnauthorizedPage.css";
import unauthorized from "../../../assets/images/unauthorized.svg";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorizedContainer">
      <div className="container m-auto  px-3">
        <div className="row row-cols-1 row-cols-md-2 my-5">
          <div className="col d-flex justify-content-center justify-content-md-end align-items-center">
            <div className="">
              <img src={unauthorized} alt="" className="unauthorizedimgStyle" />
            </div>
          </div>
          <div className="col d-flex justify-content-center justify-content-md-start align-items-center">
            <div className="">
              <h2>خطای 401</h2>
              <h2>شما به صفحه مورد نظر اجازه دسترسی ندارید</h2>
              <button
                className="mt-5 unauthorizedButton"
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

export default UnauthorizedPage;
