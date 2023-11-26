import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

let api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers["Authorization"] = `${token}`;
  } else {
    delete config.headers["Authorization"];
  }
  return config;
});

export default api;

export async function fetchProductList({ pageParam = 0 }) {
  try {
    // api.get() default
    const response = await api(`/product/?page=${pageParam}`);
    // console.log("product list", response);
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}

export async function fetchProductDetail(id) {
  try {
    const response = await api.get(`/product/${id}`);
    // console.log("product detail", response);
    return response.data;
  } catch (err) {
    console.error("API error:", err);
  }
}
export async function postProduct(input) {
  try {
    const response = await api.post(`/product/`, input);

    return response.data;
  } catch (err) {
    console.error("API error:", err);
  }
}

//input parameters takes email and password values
export const fetchRegister = async (input) => {
  const { data } = await api.post("/auth/register", input);
  return data;
};

//login
export const fetchLogin = async (input) => {
  const { data } = await api.post("/auth/login", input);
  return data;
};

// auth me
export const fetchMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

//logout add refresh_token to req body

export const fetchLogout = async () => {
  const { data } = await api.post("/auth/logout", {
    refresh_token: localStorage.getItem("refresh-token"),
  });

  return data;
};

// create an order

export const postOrder = async (input) => {
  console.log("🚀 ~ file: api.js:82 ~ postOrder ~ input:", input);
  const { data } = await api.post("/order", input);
  console.log("🚀 ~ file: api.js:83 ~ postOrder ~ data:", data);
  return data;
};

// get orders for admin

export const fetchOrders = async () => {
  const { data } = await api.get("/order");
  return data;
};

// delete product

export const deleteProduct = async (product_id) => {
  const { data } = await api.delete(`product/${product_id}`);

  return data;
};

// update product

export const updateProduct = async (input, product_id) => {
  const { data } = await api.put(`product/${product_id}`, input);
  return data;
};
