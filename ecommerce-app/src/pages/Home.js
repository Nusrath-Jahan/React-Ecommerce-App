import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
  Container,
  Chip,
  Badge,
  Fab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SliderBanner from "../components/SliderBanner";
import { useSearch } from "../context/SearchContext";


export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [added, setAdded] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const { search } = useSearch();


  useEffect(() => {
    async function fetchData() {
      const productRes = await axios.get("https://fakestoreapi.com/products");
      const categoryRes = await axios.get(
        "https://fakestoreapi.com/products/categories",
      );
      setProducts(productRes.data);
      setCategories(categoryRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAdded((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, search]);

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading products...</Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Navbar already comes from App layout */}

      {/* 🔹 SLIDER ONLY ON HOME PAGE */}
      <SliderBanner />

      {/* 🔹 Rest of your Home page content */}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        {/* 🔹 TOP BANNER  */}
        <Box
          sx={{
            height: { xs: 140, md: 220 },
            borderRadius: 3,
            mb: 3,
            background: "linear-gradient(to right, #2563eb, #1e40af)",
            display: "flex",
            alignItems: "center",
            px: { xs: 2, md: 6 },
            color: "white",
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Big Deals Everyday
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Discover trending products at best prices
            </Typography>
          </Box>
        </Box>


        {/* 🔹 HORIZONTAL CATEGORY STRIP  */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            overflowX: "auto",
            py: 1,
            mb: 3,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Chip
            label="All"
            clickable
            color={selectedCategory === "all" ? "primary" : "default"}
            onClick={() => setSelectedCategory("all")}
          />
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              color={selectedCategory === cat ? "primary" : "default"}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </Box>

        {/* 🔹 PRODUCT GRID  */}
        <Grid container spacing={2}>
          {filteredProducts.map((product) => {
            const isInCart = cartItems.some((i) => i.id === product.id);

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  sx={{
                    height: 360, // fixed total card height
                    overflow: "hidden",
                    width: 290,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 2,
                    "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      height: 140,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f5f5f5",
                      overflow: "hidden",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.title}
                      sx={{
                        width: 120,
                        height: 120,
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        height: 40,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.title}
                    </Typography>

                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: 700, mt: 1 }}
                    >
                      ${product.price}
                    </Typography>
                  </CardContent>

                  {/* Buttons fixed at bottom */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      px: 2,
                      pb: 2,
                    }}
                  >
                    <Button
                      component={Link}
                      to={`/product/${product.id}`}
                      size="small"
                      variant="outlined"
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color={
                        added[product.id] || isInCart ? "success" : "primary"
                      }
                      disabled={isInCart || added[product.id]}
                      onClick={() => handleAddToCart(product)}
                    >
                      {isInCart || added[product.id] ? "In Cart" : "Add"}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* 🔹 FLOATING CART BUTTON (Mobile) */}
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1200,
            display: { xs: "flex", md: "none" },
          }}
        >
          <Badge badgeContent={cartItems.length} color="error">
            <Fab color="primary" component={Link} to="/cart">
              <ShoppingCartIcon />
            </Fab>
          </Badge>
        </Box>
      </Container>
    </>
  );
}
