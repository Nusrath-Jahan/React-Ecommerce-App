import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import CategorySidebar from "../components/CategorySidebar";
function ShopPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const catRes = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(catRes.data);
      const prodRes = await axios.get("https://fakestoreapi.com/products");
      setProducts(prodRes.data);
    }
    fetchData();
  }, []);

  const filteredProducts = products.filter(
    (p) => selectedCategory === "all" || p.category === selectedCategory
  );

  return (
    <Grid container spacing={2} sx={{ mt: 2 }} >
      {/* Sidebar */}
      <Grid item xs={12} md={3}>
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </Grid>

      {/* Products */}
      <Grid item xs={12} md={9}>
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={9} md={4} key={product.id}>
              <Card sx={{ maxWidth: 250, margin: "auto" }}>
                <Box
                  sx={{
                    height: 150,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fafafa",
                    p: 1,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <CardContent sx={{ p: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      height: 32,
                      overflow: "hidden",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    ${product.price}
                  </Typography>
                  <Button variant="contained" size="small" sx={{ mt: 1 }}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ShopPage;
