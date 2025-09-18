import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
  <div>
    {/* Navbar */}
    <AppBar position="static" sx={{backgroundColor: "#f62121ff"}}>
      <Toolbar>
<Button component={Link} to="/" sx={{ color: "white"}}>Home</Button>
      </Toolbar>
      </AppBar>

{/* Pages */}
<Container sx={{mt: 3}}>
  <Routes>
    <Route path="/" element={<Home /> } />
    <Route path="/product/:id" element={<ProductDetails />} />
  </Routes>
</Container>

  </div>
  )
}

export default App;





 {/* <AppBar> creates a top navigation bar for the application using Material-UI.
It typically contains branding, navigation links, or action buttons. */}

{/* <Toolbar> provides a flexible container for grouping and aligning navigation elements, buttons, titles, or icons within the app bar. 
<Toolbar> helps with consistent spacing and layout of items in the top navigation bar.   */}

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
