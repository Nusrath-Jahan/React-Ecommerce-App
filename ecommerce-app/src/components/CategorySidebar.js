import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

function CategorySidebar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Categories
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedCategory === "all"}
            onClick={() => onSelectCategory("all")}
          >
            <ListItemText primary="All" />
          </ListItemButton>
        </ListItem>
        {categories.map((cat) => (
          <ListItem key={cat} disablePadding>
            <ListItemButton
              selected={selectedCategory === cat}
              onClick={() => onSelectCategory(cat)}
            >
              <ListItemText primary={cat} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
export default CategorySidebar;
