import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Card from "./pages/Card";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import StripeContainer from "./StripeContainer";
import PromoBanner from "./components/PromoBanner";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <PromoBanner />
      <Navbar />
      <div>
        {/* Pages */}
        <Container sx={{ mt: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/card" element={<Card />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/checkout" element={<StripeContainer />} />
          </Routes>
        </Container>
      </div>
    </>
  );
}

export default App;
