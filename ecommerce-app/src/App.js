import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Typography } from "@mui/material";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Card from "./pages/Card";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";

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
              <Typography sx={{ ml: 2 }}>{user.email}</Typography>
              <Button color="inherit" onClick={logout}>
                Logout
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
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;

{
  /* <AppBar> creates a top navigation bar for the application using Material-UI.
It typically contains branding, navigation links, or action buttons. */
}

{
  /* <Toolbar> provides a flexible container for grouping and aligning navigation elements, buttons, titles, or icons within the app bar. 
<Toolbar> helps with consistent spacing and layout of items in the top navigation bar.   */
}

// mt stands for margin-top
//   sx is a prop in MUI that allows you to apply custom styles using a JavaScript object.

// mr stands for margin-right
// mb stands for margin-bottom
// ml stands for margin-left
// mx stands for margin-left and margin-right
// my stands for margin-top and margin-bottom

// p stands for padding
// pt stands for padding-top
// pr stands for padding-right
// pb stands for padding-bottom
// pl stands for padding-left
// px stands for padding-left and padding-right
// py stands for padding-top and padding-bottom
