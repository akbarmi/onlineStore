export interface loginUser {
  username: string;
  password: string;
}
export interface User {
  name: string;
  email: string;
  token: string;
  role: string;
}
export interface registerUser {
  username: string;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
export interface NewProduct {
  title: string;
  brand: string;
  type: string;
  model: string;
  size: string;
  price: number;
  unit: string;
  inventory: number;
  sale_data: string;
  icon: string;
  category: string;
}
export interface Product {
  id: number;
  name: string;
  discription: string;
}
export interface BasketItem {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
}
export interface Basket {
  items: BasketItem[];
}
