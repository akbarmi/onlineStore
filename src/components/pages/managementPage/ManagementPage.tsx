import { error } from "console";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "../../../api/Agent";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { logoutUser, setManagerURL } from "../account/accountSlice";
import { setBasket } from "../basket/basketSlice";
import UnauthorizedPage from "../unauthorizedPage/UnauthorizedPage";
import ManagementAddNewProduct from "./managementAddNewProduct/ManagementAddNewProduct";
import "./ManagementPage.css";
import ManagementProductsList from "./managementProductsList/ManagementProductsList";
import ManagementUploadImages from "./managementUploadImages/ManagementUploadImages";

const ManagementPage = () => {
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

  useEffect(() => {
    dispatch(setManagerURL(true));
  }, [dispatch]);

  if (!(user?.role === "manager")) return <UnauthorizedPage />;
  return (
    <>
      <div className="managementContainer">
        <div className="container px-3 m-auto ">
          <div className="d-flex justify-content-between pt-4">
            <h4 className="pt-4">داشبورد مدیریت</h4>
            <nav className="basketdividerIcon" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item ">
                  <Link to={"/"} className="basketBreacrumbFont">
                    <i className="bi bi-house-door px-1 basketiconColor"></i>
                    صفحه اصلی
                  </Link>
                </li>
                <li className="breadcrumb-item " aria-current="page">
                  داشبورد مدیریت
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container px-3 m-auto ">
        <div className="managementBox shadow-sm row m-auto">
          <div className="p-3 w-100 d-lg-none">
            <button
              className="btn w-100 MPlistitemBtn"
              data-bs-toggle="collapse"
              data-bs-target="#listitems"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <i className="bi bi-list"></i>لیست عملیات
            </button>
          </div>
          <aside
            className="col-12 col-lg-4 p-0 m-0 border-lg-end "
            id="listitems"
          >
            <div className="managementListTitle d-none d-lg-block">
              لیست عملیات
            </div>
            <ul className="managementUL">
              <NavLink
                to="ManagementProductsList"
                className={({ isActive }) =>
                  isActive ? "MPLActiveLink" : undefined
                }
              >
                <li>
                  <i className="bi bi-box-seam managementListIcon"></i>
                  محصولات
                </li>
              </NavLink>

              <NavLink
                to="ManagementAddNewProduct"
                className={({ isActive }) =>
                  isActive ? "MPLActiveLink" : undefined
                }
              >
                <li>
                  <i className="bi bi-upload managementListIcon"></i>
                  اضافه نمودن محصول جدید
                </li>
              </NavLink>
              <NavLink
                to="ManagementUploadImages"
                className={({ isActive }) =>
                  isActive ? "MPLActiveLink" : undefined
                }
              >
                <li>
                  <i className="bi bi-images managementListIcon"></i>
                  بارگزاری تصاویر
                </li>
              </NavLink>
              <NavLink
                to="ManagementReceipts"
                className={({ isActive }) =>
                  isActive ? "MPLActiveLink" : undefined
                }
              >
                <li>
                  <i className="bi bi-receipt managementListIcon"></i>
                  فاکتورهای فروش
                </li>
              </NavLink>
              <NavLink
                to="ManagementOrders"
                className={({ isActive }) =>
                  isActive ? "MPLActiveLink" : undefined
                }
              >
                <li>
                  <i className="bi bi-card-list managementListIcon"></i>
                  سفارشات
                </li>
              </NavLink>
              <NavLink
                to="ManagementNewOrders"
                className={({ isActive }) =>
                  isActive ? "MPLActiveLink" : undefined
                }
              >
                <li>
                  <i className="bi bi-card-checklist managementListIcon"></i>
                  سفارشات جدید
                </li>
              </NavLink>

              <li onClick={() => userLogoutHandler()}>
                <i className="bi bi-box-arrow-left managementListIcon"></i>
                خروج
              </li>
            </ul>
          </aside>
          <section className="col-12 col-lg-8 pt-5 pt-lg-0">
            <Routes>
              <Route
                path="ManagementProductsList"
                element={<ManagementProductsList />}
              />
              <Route
                path="ManagementAddNewProduct"
                element={<ManagementAddNewProduct />}
              />
              <Route
                path="ManagementUploadImages"
                element={<ManagementUploadImages />}
              />
              <Route
                path="ManagementReceipts"
                element={<h1> فاکتورهای فروش</h1>}
              />
              <Route path="ManagementOrders" element={<h1> سفارشات</h1>} />
              <Route
                path="ManagementNewOrders"
                element={<h1> سفارشات جدید</h1>}
              />
            </Routes>
          </section>
        </div>
      </div>
    </>
  );
};
export default ManagementPage;
