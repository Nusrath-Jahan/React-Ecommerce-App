import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Badge,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import { useSelector } from "react-redux";

function Navbar() {
  const { user, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { search, setSearch } = useSearch();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Shop", path: "/shop" },
    { text: "Card", path: "/card" },
    ...(user
      ? [{ text: "Logout", action: logout }]
      : [
          { text: "Login", path: "/login" },
          { text: "Signup", path: "/signup" },
        ]),
  ];

  return (
    <>
      {/* 🔹 MAIN NAVBAR */}
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ gap: 2 }}>
          {/* Hamburger (mobile) */}
          <IconButton
            edge="start"
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* 🔹 LOGO */}
          <Typography
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "#2563eb",
              mr: 2,
            }}
          >
            Klevr
          </Typography>

          {/* 🔹 SEARCH BAR (desktop only) */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>

          {/* 🔹 DESKTOP MENU */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/shop" color="inherit">
              Shop
            </Button>

            {/* Cart Icon */}
            <IconButton component={Link} to="/card" color="inherit">
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {user ? (
              <>
                <Typography sx={{ mx: 2, fontSize: "0.9rem" }}>
                  {user.email}
                </Typography>
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/signup" color="inherit">
                  Signup
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🔹 MOBILE DRAWER */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                component={item.path ? Link : "button"}
                to={item.path}
                onClick={item.action ? item.action : null}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
