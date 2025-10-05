import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import CategorySidebar from "../components/CategorySidebar";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [added, setAdded] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const productRes = await axios.get("https://fakestoreapi.com/products");
        console.log("Products:", productRes.data);
        setProducts(productRes.data);

        const categoryRes = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        console.log("Categories: ", categoryRes.data);
        setCategories(categoryRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAdded((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
    //Hide "Added!" message after 1.5 seconds
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading products...
        </Typography>
      </div>
    );
  }

  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{ mt: 2, overflow: "visible" }}
    >
      <Box sx={{ mt: 2, px: { xs: 1, md: 2 } }}>
        {/* Mobile top bar: hamburger + search */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <TextField
            label="Search Products"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        {/* Desktop View */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "flex-start",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* LEFT: Sidebar area */}
          <Box
            sx={{
              width: { xs: "100%", md: 260 },
              flexShrink: 0,
              position: { xs: "static", md: "sticky" },
              top: { xs: "auto", md: "35px" },
              alignSelf: "flex-start",
              mb: { xs: 2, md: 0 },
              display: { xs: "none", md: "block" },
            }}
          >
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </Box>

          {/* RIGHT: Main content (search + products) */}
          <Box sx={{ flex: 1 }}>
            {/* Search */}
            <Box sx={{ mb: 2, display: { xs: "none", md: "block" } }}>
              <TextField
                label="Search Products"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
              />
            </Box>

            {/* Product Grid */}
            <Grid container spacing={2}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card
                      sx={{
                        width: { xs: "100%", sm: "100%", md: 220 },
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        boxShadow: 2,
                        borderRadius: 2,
                        transition: "transform 0.25s, box-shadow 0.25s",
                        "&:hover": {
                          transform: "translateY(-5px) scale(1.02)",
                          boxShadow: 6,
                        },
                        minHeight: 380,
                      }}
                    >
                      {/* Image container */}
                      <Box
                        sx={{
                          height: 180,
                          width: 200,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#fafafa",
                          padding: 1,
                          overflow: "hidden",
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
                            transition: "transform 0.3s",
                            "&:hover": {
                              transform: "scale(1.01)",
                            },
                          }}
                        />
                      </Box>
                      {/* Card content */}
                      <CardContent sx={{ p: 1, flexGrow: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            lineHeight: "1.2em",
                            height: 32,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            mb: 0.5,
                          }}
                        >
                          {product.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 0.5, fontWeight: "bold" }}
                        >
                          ${product.price}
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: 1,
                          pt: 0,
                        }}
                      >
                        <Button
                          component={Link}
                          to={`/product/${product.id}`}
                          variant="outlined"
                          size="small"
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          color={added[product.id] ? "success" : "primary"}
                          sx={{ mt: 1, ml: 1 }}
                          onClick={() => handleAddToCart(product)}
                          disabled={added[product.id]}
                        >
                          {added[product.id] ? "Added!" : "Add"}
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
                    No products found.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
