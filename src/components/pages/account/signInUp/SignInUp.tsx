import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import agent from "../../../../api/Agent";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { setBasket } from "../../basket/basketSlice";
import { singInUser, singUpUser } from "../accountSlice";
import "./SignInUp.css";

const SignInUp = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const { basket } = useAppSelector((state) => state.basket);
  const [loginValues, setLoginValues] = useState({
    Lusername: "",
    Lpassword: "",
  });
  const [registerValues, setRegisterValues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [Lusernamefocus, setLusernamefocus] = useState(false);
  const [Lpasswordfocus, setLpasswordfocus] = useState(false);
  const [focusName, setFocusName] = useState(false);
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusPassword2, setFocusPassword2] = useState(false);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی میباشد.",
        numeric: "باید عدد وارد نمایید",
        max: "حداکثر 10 کاراکتر وارد نمایید",
        min: "حداقل 5 کاراکتر باشد",
        email: "فرمت ایمیل را درست وارد کنید",
        integer: "عدد صحیح وارد نمایید",
        alpha: "فقط حروف وارد کنید",
      },
      element: (messages: any) => (
        <div style={{ color: "red", fontSize: "10px" }}>{messages}</div>
      ),
    })
  );
  const simpleValidatorSINGUP = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی میباشد.",
        numeric: "باید عدد وارد نمایید",
        max: "حداکثر 10 کاراکتر وارد نمایید",
        min: "حداقل 10 کاراکتر باشد",
        email: "فرمت ایمیل را درست وارد کنید",
        integer: "عدد صحیح وارد نمایید",
        alpha: "فقط حروف وارد کنید",
      },
      element: (messages: any) => (
        <div style={{ color: "red", fontSize: "10px" }}>{messages}</div>
      ),
    })
  );

  const loginInputChangeHandler = (event: any) => {
    const { name, value } = event.target;
    setLoginValues({ ...loginValues, [name]: value });
  };

  const registerInputChangeHandler = (event: any) => {
    const { name, value } = event.target;
    setRegisterValues({ ...registerValues, [name]: value });
  };

  const signInHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const singnInUserobj = {
      username: loginValues.Lusername,
      password: loginValues.Lpassword,
    };

    if (!simpleValidator.current.allValid()) {
      setLpasswordfocus(true);
      setLusernamefocus(true);
      simpleValidator.current.showMessages();
      toast.error("لطفا اطلاعات را به درستی وارد کنید");
    } else {
      const { type, payload }: any = await dispatch(singInUser(singnInUserobj));
      if (type === "account/signInUser/fulfilled") {
        if (payload.role === "manager") {
          document.getElementById("#closeBtn")?.click();
          navigate("/management", { replace: true });
        } else {
          document.getElementById("#closeBtn")?.click();
          navigate("/", { replace: true });
        }

        if (basket === null || !(basket.length > 0)) {
          const r = await agent.Basket.getBasket().then((r) =>
            dispatch(setBasket(r.result))
          );
        } else {
          const localbasket = basket.map((i) => ({
            product_id: i.product_id,
            qty: i.qty,
          }));
          const temp = {
            old_cart: localbasket,
          };
          const r = await agent.Basket.setServerBasket(temp);
        }
      } else {
        toast.error("نام کاربری یا کلمه عبور شما اشتباه است");
      }
    }
  };

  const signUpHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!simpleValidatorSINGUP.current.allValid()) {
      setFocusName(true);
      setFocusUsername(true);
      setFocusEmail(true);
      setFocusPassword(true);
      setFocusPassword2(true);

      simpleValidatorSINGUP.current.showMessages();
      toast.error("لطفا اطلاعات را به درستی وارد کنید");
    } else {
      const { type, payload }: any = await dispatch(singUpUser(registerValues));
      if (type === "account/signUpUser/fulfilled") {
        document.getElementById("#closeBtn")?.click();
        navigate("/productsList", { replace: true });
      } else {
        toast.error("نام کاربری یا کلمه عبور شما اشتباه است");
      }
    }
  };
  return (
    <div
      className="modal fade "
      id="signInsingUpModal"
      tabIndex={-1}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="signInsingUpModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header pb-0 mb-0 pt-1 modalHeaderBackgroung">
            <ul className="nav nav-tabs navBorder" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link active d-flex justify-content-center align-items-center"
                  id="signIn-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#signIn"
                  type="button"
                  role="tab"
                  aria-controls="signIn"
                  aria-selected="true"
                >
                  <i className="bi bi-box-arrow-in-left SignInUpIconStyle "></i>
                  <p className="m-0 p-0"> ورود به حساب کاربری</p>
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link d-flex justify-content-center align-items-center"
                  id="signUp-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#signUp"
                  type="button"
                  role="tab"
                  aria-controls="signUp"
                  aria-selected="false"
                >
                  <i className="bi bi-person SignInUpIconStyle"></i>
                  <p className="m-0 p-0">ثبت نام</p>
                </a>
              </li>
            </ul>
            <button
              type="button"
              id="#closeBtn"
              className="btn-close btnClose"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="signIn"
                role="tabpanel"
                aria-labelledby="signIn-tab"
              >
                <form onSubmit={signInHandler}>
                  <div className="mb-1">
                    <label className="col-form-label SIUfontSize">
                      نام کاربری
                    </label>
                    <input
                      type="text"
                      className="form-control inputShadow"
                      name="Lusername"
                      value={loginValues.Lusername}
                      onChange={loginInputChangeHandler}
                      onFocus={() => setLusernamefocus(true)}
                      onBlur={
                        Lusernamefocus
                          ? () =>
                              simpleValidator.current.showMessageFor(
                                "نام کاربری"
                              )
                          : () => {}
                      }
                    />
                    {simpleValidator.current.message(
                      "نام کاربری",
                      loginValues.Lusername,
                      "required|min:5"
                    )}
                  </div>
                  <div className="mb-1">
                    <label className="col-form-label SIUfontSize">
                      رمز عبور
                    </label>
                    <input
                      type="password"
                      className="form-control inputShadow"
                      name="Lpassword"
                      value={loginValues.Lpassword}
                      onChange={loginInputChangeHandler}
                      onFocus={() => setLpasswordfocus(true)}
                      onBlur={
                        Lpasswordfocus
                          ? () =>
                              simpleValidator.current.showMessageFor(
                                "کلمه عبور"
                              )
                          : () => {}
                      }
                    />
                    {simpleValidator.current.message(
                      "کلمه عبور",
                      loginValues.Lpassword,
                      "required|min:5"
                    )}
                  </div>
                  <div className="d-flex justify-content-end pb-4">
                    {/* <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="rememberMe"
                    />
                    <label className="rememberMelabel" htmlFor="rememberMe">
                      مرا به یادآور
                    </label>
                  </div> */}

                    <a className="forgotPassword SIUfontSize" href="">
                      رمز خود را فراموش کرده&zwnj;اید؟
                    </a>
                  </div>

                  <button type="submit" className="btn btn-sm buttonStyle mb-2">
                    ورود
                  </button>
                </form>
              </div>
              <div
                className="tab-pane fade"
                id="signUp"
                role="tabpanel"
                aria-labelledby="signUp-tab"
              >
                <form onSubmit={signUpHandler}>
                  <div className="mb-1">
                    <label className="col-form-label SIUfontSize">
                      نام کامل
                    </label>
                    <input
                      type="text"
                      className="form-control inputShadow"
                      name="name"
                      value={registerValues.name}
                      onChange={registerInputChangeHandler}
                      onFocus={() => setFocusName(true)}
                      onBlur={
                        focusName
                          ? () =>
                              simpleValidatorSINGUP.current.showMessageFor(
                                "name"
                              )
                          : () => {}
                      }
                    />
                    {simpleValidatorSINGUP.current.message(
                      "name",
                      registerValues.name,
                      "required"
                    )}
                  </div>
                  <div className="mb-1">
                    <label className="col-form-label SIUfontSize">
                      نام کاربری
                    </label>
                    <input
                      type="text"
                      className="form-control inputShadow"
                      name="username"
                      value={registerValues.username}
                      onChange={registerInputChangeHandler}
                      onFocus={() => setFocusUsername(true)}
                      onBlur={
                        focusUsername
                          ? () =>
                              simpleValidatorSINGUP.current.showMessageFor(
                                "username"
                              )
                          : () => {}
                      }
                    />
                    {simpleValidatorSINGUP.current.message(
                      "username",
                      registerValues.username,
                      "required"
                    )}
                  </div>
                  <div className="mb-1">
                    <label className="col-form-label SIUfontSize">ایمیل</label>
                    <input
                      type="email"
                      className="form-control inputShadow"
                      name="email"
                      value={registerValues.email}
                      onChange={registerInputChangeHandler}
                      onFocus={() => setFocusEmail(true)}
                      onBlur={
                        focusEmail
                          ? () =>
                              simpleValidatorSINGUP.current.showMessageFor(
                                "email"
                              )
                          : () => {}
                      }
                    />
                    {simpleValidatorSINGUP.current.message(
                      "email",
                      registerValues.email,
                      "required|email"
                    )}
                  </div>
                  <div className="mb-1">
                    <label className="col-form-label SIUfontSize">
                      رمز عبور
                    </label>
                    <input
                      type="password"
                      className="form-control inputShadow"
                      name="password"
                      value={registerValues.password}
                      onChange={registerInputChangeHandler}
                      onFocus={() => setFocusPassword(true)}
                      onBlur={
                        focusPassword
                          ? () =>
                              simpleValidatorSINGUP.current.showMessageFor(
                                "password"
                              )
                          : () => {}
                      }
                    />
                    {simpleValidatorSINGUP.current.message(
                      "password",
                      registerValues.password,
                      "required|min:10"
                    )}
                  </div>
                  <div className="mb-1">
                    <label className="col-form-label SIUfontSize">
                      تکرار رمز عبور
                    </label>
                    <input
                      type="password"
                      className="form-control inputShadow"
                      name="password_confirmation"
                      value={registerValues.password_confirmation}
                      onChange={registerInputChangeHandler}
                      onFocus={() => setFocusPassword2(true)}
                      onBlur={
                        focusPassword2
                          ? () =>
                              simpleValidatorSINGUP.current.showMessageFor(
                                "password_confirmation"
                              )
                          : () => {}
                      }
                    />
                    {simpleValidatorSINGUP.current.message(
                      "passwpassword_confirmationord",
                      registerValues.password_confirmation,
                      "required|min:10"
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-sm buttonStyle mt-4 mb-2 "
                  >
                    ثبت نام
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignInUp;
