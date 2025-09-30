import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <AppBar position="static" color="default" sx={{ width: "100%" , top: "53px"}}>
      <Toolbar disableGutters>
        <Button
          component={Link}
          to="/"
          sx={{ color: "black", fontWeight: "bold", fontSize: "33px" }}
        >
          K l e v r
        </Button>
        <Button component={Link} to="/" sx={{ color: "black" }}>
          Home
        </Button>
        <Button color="inherit" component="Link" to="/shop">
          Shop
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
  );
}
export default Navbar;
