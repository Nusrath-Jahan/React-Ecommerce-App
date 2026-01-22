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
  Container,
} from "@mui/material";

export default function ShopPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  // Category image mapping (you can replace these with your own images later)
  const categoryImages = {
    electronics:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    "men's clothing":
      "https://images.unsplash.com/photo-1521334884684-d80222895322",
    "women's clothing":
      "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    jewelery:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
  };

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
    (p) => !selectedCategory || p.category === selectedCategory
  );

  // --- CATEGORY VIEW ---
  if (!selectedCategory) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Shop by Category
        </Typography>

        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category}>
              <Card
                onClick={() => setSelectedCategory(category)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  overflow: "hidden",
                  height: 220,
                  position: "relative",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                  },
                }}
              >
                {/* Category Image */}
                <CardMedia
                  component="img"
                  image={categoryImages[category]}
                  alt={category}
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Dark overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1))",
                  }}
                />

                {/* Category Title */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    right: 16,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "#fff", textTransform: "capitalize" }}
                  >
                    {category}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  // --- PRODUCT VIEW ---
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={3} gap={2}>
        <Button variant="outlined" onClick={() => setSelectedCategory(null)}>
          ← Back to Categories
        </Button>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ textTransform: "capitalize" }}
        >
          {selectedCategory}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  height: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fafafa",
                  p: 2,
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

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ lineHeight: 1.3, height: 40, overflow: "hidden" }}
                >
                  {product.title}
                </Typography>

                <Typography
                  variant="body1"
                  color="primary"
                  sx={{ fontWeight: "bold", mt: 1 }}
                >
                  ${product.price}
                </Typography>
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ borderRadius: 2, textTransform: "none" }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
