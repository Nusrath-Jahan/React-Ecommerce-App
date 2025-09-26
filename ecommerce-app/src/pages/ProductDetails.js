import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  const { id } = useParams(); // id will be the value from the URL
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);
  if (!product) return <Typography>Loading...</Typography>; // Display a loading message while product data is being fetched
 
  return (
    <Card>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{ maxWidth: 200, margin: "auto", mt: 2 }}
      />
      
      <CardContent sx={{ textAlign: "center", mb: 2, px: 2, py: 1 }}>
        <Typography variant="h4">{product.title}</Typography>
        <Typography variant="h6">${product.price}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {product.description}
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductDetails;

