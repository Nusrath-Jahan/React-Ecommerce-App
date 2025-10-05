import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Drawer,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function CategorySidebar({ categories, selectedCategory, onSelectCategory ,onMobileToggle }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
     if (onMobileToggle) onMobileToggle();
  };

  const drawerContent = (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedCategory === "all"}
            onClick={() => {
              onSelectCategory("all");
              setMobileOpen(false); 
            }}
          >
            <ListItemText primary="All" />
          </ListItemButton>
        </ListItem>
        {categories.map((cat) => (
          <ListItem key={cat} disablePadding>
            <ListItemButton
              selected={selectedCategory === cat}
              onClick={() => {
                onSelectCategory(cat);
                setMobileOpen(false);
              }}
            >
              <ListItemText primary={cat} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {/* Hamburger button visible only on mobile */}
      <Box sx={{ display: { xs: "block", md: "none" }, mb: 1 }}>
        <IconButton onClick={handleDrawerToggle} color="primary">
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Drawer for mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawerContent}
      </Drawer>

      {/* Sidebar for desktop */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>{drawerContent}</Box>
    </div>
  );
}

export default CategorySidebar;
