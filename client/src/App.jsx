import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Signin from "./pages/Auth/signin";
import Signup from "./pages/Auth/signup";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/products";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error404";
import Admin from "./pages/Admin";
import Home from "./pages/Admin/Home";
import Orders from "./pages/Admin/Orders";
import AdminProducts from "./pages/Admin/Products";
import OrderDetail from "./pages/Admin/OrderDetail";
import AdminProductsDetail from "./pages/Admin/ProductDetail";
import NewProduct from "./pages/Admin/NewProduct";

function App() {

  return (
    <div className="main-container container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/auth">
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* create a protected route */}
          <Route element={<ProtectedRoute admin={true} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />}>
              <Route index element={<Home />} />
              <Route exact path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<NewProduct />} />
              <Route
                path="products/:product_id"
                element={<AdminProductsDetail />}
              />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:order_id" element={<OrderDetail />} />
            </Route>
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
