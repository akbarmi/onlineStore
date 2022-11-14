import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://flamingomarkets.ir/api/";
const sleep = () => new Promise((resolve) => setTimeout(resolve, 400));

// axios.defaults.withCredentials = true;
// axios.defaults.headers.post["Content-Type"] = "application/json";
// const TOKEN = localStorage.getItem("token");
// if (TOKEN) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;
// }

//using this we return just data
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  // const token = store.getState().account.user?.token;
  const token = localStorage.getItem("token");
  if (token) config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    console.log(error.response);
    const { status } = error.response!;
    switch (status) {
      case 405:
        toast.error("نمیدونم");
        break;
      case 401:
        toast.error("اجازه دسترسی ندارید");
        break;
      case 500:
        toast.error("مشکل در سرور رخ داده");
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  getWithHeader: (url: string, header: {}) =>
    axios.get(url, header).then(responseBody),
  postWithHeaderFormdata: (url: string, body: any, header: {}) =>
    axios.post(url, body, header).then(responseBody),
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Product = {
  details: (id: number) => requests.get(`products/${id}`),
  uploadImages: (value: any, header: any) =>
    requests.postWithHeaderFormdata("files/public", value, header),
  addNewProduct: (data: any) => requests.post("products", data),
  getProductCategory: () => requests.get("products/create"),
  getClassification: () => requests.get(`page/home`),
  getProduct: (id: number) => requests.get(`products/${id}/edit`),
  getAllProducts: (page: string) => requests.get(page),
  updateProduct: (id: number, data: {}) => requests.put(`products/${id}`, data),
  deleteProduct: (id: number) => requests.delete(`products/${id}`),
  getSearchResults: (category: string) => requests.get(`category/${category}`),
};

const Account = {
  login: (value: any) => requests.post("login", value),
  // login: (value: any) => requests.post("login", JSON.stringify(value)),
  register: (value: any) => requests.post("register", value),
  getUserRole: (header: any) => requests.getWithHeader("dashboard", header),
  currentUser: () => requests.get("current"),
  logout: () => requests.post("logout", {}),
};

//as we use query string so the body is empty
const Basket = {
  getBasket: () => requests.get("cart"),
  setServerBasket: (products: any) => requests.post("cart/insert", products),
  addItem: (product: any) => requests.post(`cart`, product),
  updateItem: (productId: number, quantity: number) =>
    requests.put(`cart/${productId}?qty=${quantity}`, {}),
  removeItem: (productId: number) => requests.delete(`cart/${productId}`),
};

const agent = {
  Product,
  Account,
  Basket,
};
export default agent;
