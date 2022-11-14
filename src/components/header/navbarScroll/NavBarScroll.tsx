import logo from "../../../assets/icons/Logo.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./NavBarScroll.css";
import SignInUp from "../../pages/account/signInUp/SignInUp";
import { Link, useNavigate } from "react-router-dom";
import DropdownMainMenu from "../menu/DropdownMainMenu";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { logoutUser } from "../../pages/account/accountSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { setBasket } from "../../pages/basket/basketSlice";

const NavBarScroll = () => {
  const { user } = useAppSelector((state) => state.account);
  const { basket } = useAppSelector((state) => state.basket);
  const itemCount = basket?.reduce((sum, item) => sum + item.qty, 0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 250) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

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
      <header
        className={
          scrollNav
            ? " shadow-sm d-none d-lg-block navbarShow"
            : "navbarscrollDisappear"
        }
      >
        <div className=" navbar  navbar-expand-lg navbar-light NavbarScrollbackLight py-0 ">
          <div className="container px-3 m-auto py-0">
            <a className="navbar-brand pe-3 " href="#">
              <img width="60" src={logo} alt="Akbar Mirzaei" />
            </a>
            <div className="position-relative d-none d-lg-flex flex-nowrap flex-grow-1 px-3">
              <input
                className="form-control pe-5 NavbarScrollsearchInputShadow"
                type="text"
                placeholder="جستجوی کالا"
              />
              <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y text-muted me-4 pt-1"></i>
            </div>
            <div className="NavbarScrollnavbar-tool-icon-box pt-2">
              <a
                data-bs-toggle="collapse"
                href="#collapseNavbar"
                role="button"
                aria-expanded="false"
                aria-controls="collapseNavbar"
              >
                <i className="bi bi-list iconColor NavbarScrollnavbarIconSize"></i>
              </a>
            </div>

            {user ? (
              <div className="dropdown">
                <a
                  className="NavbarScrollnavbar-tool ps-1 ps-lg-0 pe-lg-2 px-xl-4"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="NavbarScrollnavbar-tool-icon-box pt-1">
                    <i className="bi bi-person iconColor NavbarScrollnavbarIconSize "></i>
                  </div>
                  <div className="NavbarScrollnavbar-tool-text d-inline">
                    <small>{user.name}</small>حساب کاربری
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end NavbarScrollgoUpDropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-person pe-2 fs-6 iconColor "></i>
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
                className="NavbarScrollnavbar-tool ps-1 ps-lg-0 pe-lg-2 px-xl-4"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#signInsingUpModal"
              >
                <div className="NavbarScrollnavbar-tool-icon-box pt-1">
                  <i className="bi bi-person iconColor me-2 NavbarScrollnavbarIconSize"></i>
                </div>
                <div className="NavbarScrollnavbar-tool-text d-inline">
                  <small>سلام, ورود</small>حساب کاربری
                </div>
              </a>
            )}

            <Link
              className="NavbarScrollnavbar-tool  ps-2 pe-3 pe-lg-1 px-xxl-0"
              to={"/basket"}
            >
              <div className="NavbarScrollnavbar-tool-icon-box NavbarScrolliconBackground position-relative">
                {itemCount ? (
                  <span className="position-absolute top-0 start-85 translate-middle badge rounded-pill badgeFontsize ">
                    {itemCount !== undefined && itemCount > 99
                      ? "99+"
                      : itemCount}

                    <span className="visually-hidden">unread messages</span>
                  </span>
                ) : undefined}
                <i className="bi bi-cart3 iconColor"></i>
              </div>
              <div className="NavbarScrollnavbar-tool-text d-inline ps-4">
                <small>سبد</small>
                <span>2454000</span>
                <span className="NavbarScrollunit">تومان</span>
              </div>
            </Link>
          </div>
        </div>

        <div
          className="collapse navbar navbar-expand-lg navbar-light NavbarScrollbackLight pt-0 pb-1"
          id="collapseNavbar"
        >
          <div className="container px-3 m-auto">
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <hr className="d-lg-none my-3" />
              <ul className="navbar-nav pe-lg-2 me-lg-2">
                <li className="nav-item dropdown">
                  <div
                    className="nav-link ps-0"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-grid me-2"></i>
                    دسته&zwnj;بندی کالاها
                    <i className="bi bi-caret-down-fill NavbarScrollarrowDrop"></i>
                  </div>
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
              </ul>
            </div>
          </div>
        </div>
      </header>
      <SignInUp />
    </>
  );
};
export default NavBarScroll;
