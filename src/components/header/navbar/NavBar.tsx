import logo from "../../../assets/icons/Logo.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./NavBar.css";
import SignInUp from "../../pages/account/signInUp/SignInUp";
import { Link, useNavigate } from "react-router-dom";
import DropdownMainMenu from "../menu/DropdownMainMenu";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { logoutUser } from "../../pages/account/accountSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { setBasket } from "../../pages/basket/basketSlice";

const NavBar = () => {
  const { user } = useAppSelector((state) => state.account);
  const { basket } = useAppSelector((state) => state.basket);
  const itemCount = basket?.reduce((sum, item) => sum + item.qty, 0);
  // const itemsPrice = basket?.reduce(
  //   (sum, item) => sum + item.qty * item.product!.price,
  //   0
  // );
  const { listLevelOne } = useAppSelector((state) => state.category);
  const [list, setList] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setList(listLevelOne);
  }, [listLevelOne]);

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
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="navbar-tool-icon-box">
                      <i className="bi bi-person iconColor me-2"></i>
                    </div>
                    <div className="navbar-tool-text d-none d-lg-inline">
                      <small>{user.name}</small>حساب کاربری
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end goUpDropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bi bi-person pe-2 fs-6 iconColor"></i>
                        {user.name}
                      </a>
                    </li>
                    {user.role === "manager" ? (
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
                    ) : (
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-person pe-2 fs-6 iconColor"></i>
                          داشبورد
                        </a>
                      </li>
                    )}
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
                  className="navbar-tool ms-1 ms-lg-0 me-lg-2 mx-xl-4"
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

              <Link
                className="navbar-tool ms-lg-4 ms-2 me-3 me-lg-1 mx-xxl-0"
                to={"/basket"}
              >
                <div className="navbar-tool-icon-box ">
                  <div className="position-relative">
                    {itemCount ? (
                      <span className="position-absolute top-0 start-85 translate-middle badge rounded-pill badgeFontsize ">
                        {itemCount !== undefined && itemCount > 99
                          ? "99+"
                          : itemCount}

                        <span className="visually-hidden">unread messages</span>
                      </span>
                    ) : undefined}
                    <i className="bi bi-cart3 iconColor iconBackground px-3 py-2"></i>
                  </div>
                </div>
                <div className="navbar-tool-text d-none d-lg-inline ms-4">
                  <small>سبد</small>
                  <span>2454000</span>
                  <span className="unit">تومان</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar navbar-expand-lg navbar-light backLight pt-0 pb-1">
          <div className="container px-3 m-auto">
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <hr className="d-lg-none my-3" />
              <ul className="navbar-nav pe-lg-2 me-lg-2">
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
                  <DropdownMainMenu list={list} />
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
              </ul>
            </div>
          </div>
        </div>
      </header>
      <SignInUp />
    </>
  );
};
export default NavBar;
