import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Typography } from "@mui/material";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Card from "./pages/Card";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { useAuth } from "./context/AuthContext";
import StripeContainer from "./StripeContainer";

function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#f62121ff" }}>
        <Toolbar>
          <Button component={Link} to="/" sx={{ color: "white" }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/card">
            Card
          </Button>

          {user ? (
            <>
              <Typography sx={{ mx: 2 }}>{user.email}</Typography>
              <Button color="inherit" onClick={logout}>
                logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

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
  );
}

export default App;
