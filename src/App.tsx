import "./App.css";
import InfoHeader from "./components/header/info/InfoHeader";
import NavBar from "./components/header/navbar/NavBar";
import Footer from "./components/footer/Footer";
import LandingPage from "./components/pages/landingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import About from "./components/pages/about/About";
import ProductsList from "./components/pages/productsList/ProductsList";
import ProductDetails from "./components/pages/productDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/pages/notFound/NotFound";
import BasketPage from "./components/pages/basket/BasketPage";
import { useCallback, useEffect, useState } from "react";
import ManagementPage from "./components/pages/managementPage/ManagementPage";
import NavBarScroll from "./components/header/navbarScroll/NavBarScroll";
import { useAppDispatch, useAppSelector } from "./store/store";
import NavbarManagement from "./components/header/navbarManagement/NavbarManagement";
import { fetchCurrentUser } from "./components/pages/account/accountSlice";
import LoadingComponent from "./components/pages/loadingComponent/LoadingComponent";
import { getCategories } from "./components/header/menuListSlice";
import { json } from "node:stream/consumers";
import { setBasket } from "./components/pages/basket/basketSlice";
import agent from "./api/Agent";
import { getTrendProducts } from "./components/pages/productsList/producsListSlice";

function App() {
  const dispatch = useAppDispatch();
  const { user, isManagerURL } = useAppSelector((state) => state.account);
  const [navbar, setNavbar] = useState(false);
  const [loading, setLoading] = useState(true);
  //--------------I use subscribe method but it is not work---------------
  // store.subscribe(() => {
  //   const newRole = store.getState().account.user?.role;
  //   newRole === "manager" && window.location.pathname.includes("management")
  //     ? setNavbar(true)
  //     : setNavbar(false);
  // });
  // const initApp = useCallback(async () => {
  //   try {
  //     await dispatch(fetchCurrentUser());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [dispatch]);

  useEffect(() => {
    // initApp().then(() => setLoading(false));
    try {
      // setLoading(false);
      dispatch(getTrendProducts("2"));
      dispatch(getCategories()).then(() => setLoading(false));
      dispatch(fetchCurrentUser()).then(() => {
        const bas = localStorage.getItem("bs");
        if (bas !== null) {
          if (JSON.parse(bas).length > 0) {
            dispatch(setBasket(JSON.parse(bas)));
          } else {
            agent.Basket.getBasket().then((r) => dispatch(setBasket(r.result)));
          }
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  // }, [initApp]);

  useEffect(() => {
    isManagerURL && user?.role === "manager"
      ? setNavbar(true)
      : setNavbar(false);
  }, [user, isManagerURL, navbar, setNavbar]);

  if (loading) return <LoadingComponent />;

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {navbar ? (
        <NavbarManagement />
      ) : (
        <>
          <InfoHeader />
          <NavBar />
          <NavBarScroll />
        </>
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/productsList" element={<ProductsList />} />
        <Route path="/productsList/:category" element={<ProductsList />} />
        <Route
          path="/productsList/productDetail/:id"
          element={<ProductDetails />}
        />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/management/*" element={<ManagementPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
