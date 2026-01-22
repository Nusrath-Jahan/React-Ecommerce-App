import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import StripeContainer from "./StripeContainer";
import PromoBanner from "./components/PromoBanner";
import Navbar from "./components/Navbar";
import ShopPage from "./pages/ShopPage";
import "./App.css";
import Cart from "./pages/Cart";
function App() {
  return (
    <>
      <PromoBanner />
      <Navbar />

      <div>
        {/* Pages */}
        <Container sx={{ mt: 3 }} maxWidth={false}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/checkout" element={<StripeContainer />} />
            <Route path="/shop" element={<ShopPage />} key="shop" />
          </Routes>
        </Container>
      </div>
    </>
  );
}

export default App;
