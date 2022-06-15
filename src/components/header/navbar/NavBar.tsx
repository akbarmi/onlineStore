import logo from "../../../assets/icons/Logo.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./NavBar.css";

const NavBar = () => {
  return (
    <header>
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
              className="form-control pe-5 inputShadow"
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

            <a className="navbar-tool ms-1 ms-lg-0 me-lg-2 mx-xl-4" href="#">
              <div className="navbar-tool-icon-box">
                <i className="bi bi-person iconColor me-2"></i>
              </div>
              <div className="navbar-tool-text d-none d-lg-inline">
                <small>سلام, ورود</small>حساب کاربری
              </div>
            </a>
            <a
              className="navbar-tool ms-lg-4 ms-2 me-3 me-lg-1 mx-xxl-0"
              href="#"
            >
              <div className="navbar-tool-icon-box ">
                <div className="position-relative">
                  <span className="position-absolute top-0 start-95 translate-middle badge rounded-pill badgeFontsize ">
                    99+
                    <span className="visually-hidden">unread messages</span>
                  </span>
                  <i className="bi bi-cart3 iconColor iconBackground px-3 py-2"></i>
                </div>
              </div>
              <div className="navbar-tool-text d-none d-lg-inline ms-4">
                <small>سبد</small>
                <span>2454000</span>
                <span className="unit">تومان</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="navbar navbar-expand-lg navbar-light backLight pt-0 pb-1">
        <div className="container px-3 m-auto">
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <hr className="d-lg-none my-3" />
            <ul className="navbar-nav pe-lg-2 me-lg-2">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle ps-0" href="#">
                  <i className="bi bi-grid me-2"></i>
                  دسته&zwnj;بندی کالاها
                </a>
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
  );
};
export default NavBar;
