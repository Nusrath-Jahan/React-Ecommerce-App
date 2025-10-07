import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Button,
  Card,
  CardMedia,
  Grid,
  Divider,
  Box,
} from "@mui/material";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h5">Your cart is empty</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        p: 4,
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Shopping Cart
      </Typography>

      {/* ✅ Use Flexbox for sticky layout instead of Grid */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 3,
          width: "100%",
        }}
      >
        {/* LEFT SIDE: Product List */}
        <Box sx={{ flex: 3 }}>
          {cart.map((item) => (
            <Card
              key={item.id}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 3,
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Product Image */}
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                  borderRadius: 2,
                  backgroundColor: "#f9f9f9",
                  mr: 2,
                }}
              />

              {/* Product Info */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  ${item.price.toFixed(2)} each
                </Typography>

                {/* Quantity + Subtotal + Remove */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  {/* Quantity controls */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                      px: 1,
                    }}
                  >
                    <Button
                      size="small"
                      onClick={() => dispatch(decreaseQty(item.id))}
                      sx={{ minWidth: 30 }}
                    >
                      -
                    </Button>
                    <Typography>{item.quantity}</Typography>
                    <Button
                      size="small"
                      onClick={() => dispatch(increaseQty(item.id))}
                      sx={{ minWidth: 30 }}
                    >
                      +
                    </Button>
                  </Box>

                  <Typography fontWeight={600}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>

                  <Button
                    color="error"
                    variant="text"
                    size="small"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>

        {/* RIGHT SIDE: Sticky Checkout Summary */}
        <Box
          sx={{
            flex: 1,
            position: "sticky",
            top: 20,
            alignSelf: "flex-start",
          }}
        >
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Order Summary
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography fontWeight={600}>Total</Typography>
              <Typography fontWeight={600}>${total.toFixed(2)}</Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                py: 1.3,
                backgroundColor: "#f97316",
                "&:hover": { backgroundColor: "#ea580c" },
                fontWeight: 600,
                borderRadius: 2,
                mt: 2,
              }}
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default Cart;
