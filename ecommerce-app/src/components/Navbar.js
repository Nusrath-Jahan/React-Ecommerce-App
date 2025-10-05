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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      <AppBar
        position="static"
        color="default"
        sx={{ width: "100%", top: "53px" ,direction: "flex" ,alignItems:"flex-start" ,justifyContent:"space-between"}}
      >
        <Toolbar>
          {/* Hamburger menu for mobile */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Brand */}
          <Button
            component={Link}
            to="/"
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "24px",
              flexGrow: 1,
              
            }}
          >
            K l e v r
          </Button>

          {/* Desktop menu */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Button component={Link} to="/" sx={{ color: "black" }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/shop">
              Shop
            </Button>
            <Button color="inherit" component={Link} to="/card">
              Card
            </Button>

            {user ? (
              <>
                <Typography sx={{ mx: 2 }}>{user.email}</Typography>
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
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
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
