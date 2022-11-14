import logo from "../../../assets/icons/Logo.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./NavbarManagement.css";
import SignInUp from "../../pages/account/signInUp/SignInUp";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { logoutUser } from "../../pages/account/accountSlice";
import { toast } from "react-toastify";
import { setBasket } from "../../pages/basket/basketSlice";

const NavbarManagement = () => {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userLogoutHandler = async () => {
    const { type } = await dispatch(logoutUser()).then(() =>
      dispatch(setBasket([]))
    );

    if (type === "account/logoutUser/fulfilled") {
      toast.success("با موفقیت خارج شدید");
      navigate("/");
    }
  };

  return (
    <>
      <header className="shadow-sm">
        <div className="navbar navbar-expand-lg navbar-light backLight py-0 ">
          <div className="container px-3 m-auto py-0">
            <a className="navbar-brand d-none d-lg-block me-3 " href="#">
              <img width="85" src={logo} alt="Akbar Mirzaei" />
            </a>
            <a className="navbar-brand d-lg-none me-2" href="#">
              <img width="70" src={logo} alt="Akbar Mirzaei" />
            </a>
            <div className="position-relative d-none d-lg-flex flex-nowrap flex-grow-1 mx-4">
              <input
                className="form-control pe-5 searchInputShadow"
                type="text"
                placeholder="جستجوی کالا"
              />
              <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y text-muted me-3 pt-1"></i>
            </div>
            <div className="navbar-toolbar d-flex align-items-center">
              <button
                className="navbar-toggler togglerRemoveShadow"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              {user ? (
                <div className="dropdown">
                  <a
                    className="navbar-tool ms-1 ms-lg-0 me-lg-2 mx-xl-4"
                    href="#"
                    // data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="navbar-tool-icon-box">
                      <i className="bi bi-person iconColor me-2"></i>
                    </div>
                    <div className="navbar-tool-text d-none d-lg-inline">
                      <small>{user.name}</small>حساب کاربری
                    </div>
                  </a>
                  {/* <ul className="dropdown-menu dropdown-menu-end goUpDropdown-menu"> */}
                  <ul className="dropdown-menu menuPosition">
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bi bi-person pe-2 fs-6 iconColor"></i>
                        {user.name}
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => navigate("/management")}
                      >
                        <i className="bi bi-person pe-2 fs-6 iconColor"></i>
                        داشبورد
                      </a>
                    </li>

                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => userLogoutHandler()}
                      >
                        <i className="bi bi-box-arrow-left pe-2 fs-6 iconColor"></i>
                        خروج از حساب کاربری
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <a
                  className="navbar-tool ms-1  ms-lg-5 "
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#signInsingUpModal"
                >
                  <div className="navbar-tool-icon-box">
                    <i className="bi bi-person iconColor me-2"></i>
                  </div>
                  <div className="navbar-tool-text d-none d-lg-inline">
                    <small>سلام, ورود</small>حساب کاربری
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="navbar navbar-expand-lg navbar-light backLight pt-0 pb-1">
          <div className="container px-3 m-auto">
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <hr className="d-lg-none my-3" />
              {/* <ul className="navbar-nav pe-lg-2 me-lg-2">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link ps-0"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-grid me-2"></i>
                    دسته&zwnj;بندی کالاها
                    <i className="bi bi-caret-down-fill arrowDrop"></i>
                  </a>
                  <DropdownMainMenu />
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    فروش ویژه
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    تخفیفات
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    پرفروش&zwnj;ترین&zwnj;ها
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </header>
      <SignInUp />
    </>
  );
};
export default NavbarManagement;
