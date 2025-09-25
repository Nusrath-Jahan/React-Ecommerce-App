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
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

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
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading products...
        </Typography>
      </div>
    );
  }

  return (
    <div>
      {/* Search & Category Filter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        <TextField
          label="Search Products"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Category"
          value={selectedCategory}
          defaultValue="all"
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{ width: 200 }}
          
        >
          <MenuItem value="all">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {/* Product Grid */}
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{
                  width: 200,
                  height: 200,
                  objectFit: "contain",
                  margin: "auto",
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                    margin: "auto",
                  }}
                >
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center, mt: 2",
                    objectFit: "contain",
                    margin: "auto",
                  }}
                >
                  <Button
                    component={Link}
                    to={`/product/${product.id}`}
                    variant="contained"
                    sx={{ mt: 1 }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    color={added[product.id] ? "success" : "primary"}
                    sx={{ mt: 1, ml: 1 }}
                    onClick={() => handleAddToCart(product)}
                    disabled={added[product.id]}
                  >
                    {added[product.id] ? "Added!" : "Add to Cart"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {filteredProducts.length === 0 && !loading && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          No products found.
        </Typography>
      )}
    </div>
  );
}

export default Home;
//what si the meaning of <MenuItem value="all">All</MenuItem>?
//It creates a dropdown option labeled "All" with a value of "all" for filtering products by category.
