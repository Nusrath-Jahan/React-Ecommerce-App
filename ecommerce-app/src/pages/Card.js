import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Button,
  Card,
  CardMedia,
  Divider,
  Box,
  Container,
  Stack,
} from "@mui/material";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Your cart is empty
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Looks like you haven’t added anything yet
        </Typography>
        <Button variant="contained" component={Link} to="/">
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Shopping Cart
      </Typography>

      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          gap: 4,
        }}
      >
        {/* LEFT: Cart Items */}
        <Box sx={{ flex: 3 }}>
          <Stack spacing={3}>
            {cart.map((item) => (
              <Card
                key={item.id}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                {/* Image */}
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    width: { xs: "100%", sm: 140 },
                    height: { xs: 200, sm: 140 },
                    objectFit: "contain",
                    backgroundColor: "#fafafa",
                    borderRadius: 2,
                  }}
                />

                {/* Info */}
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={600} sx={{ mb: 0.5 }}>
                    {item.title}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    ${item.price.toFixed(2)} each
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    {/* Quantity */}
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
                      >
                        -
                      </Button>
                      <Typography fontWeight={600}>{item.quantity}</Typography>
                      <Button
                        size="small"
                        onClick={() => dispatch(increaseQty(item.id))}
                      >
                        +
                      </Button>
                    </Box>

                    <Typography fontWeight={700}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>

                    <Button
                      color="error"
                      size="small"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* RIGHT: Summary */}
        <Box
          sx={{
            flex: 1,
            position: { md: "sticky" },
            top: 100,
            mt: { xs: 4, md: 0 },
          }}
        >
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Order Summary
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography fontWeight={600}>Total</Typography>
              <Typography fontWeight={700}>${total.toFixed(2)}</Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              component={Link}
              to="/checkout"
              sx={{
                py: 1.4,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </Box>
      </Box>

      {/* Mobile Bottom Bar */}
      <Box
        sx={{
          position: { xs: "fixed", md: "static" },
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          boxShadow: { xs: "0 -2px 10px rgba(0,0,0,0.1)", md: "none" },
          p: { xs: 2, md: 0 },
          display: { xs: "flex", md: "none" },
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        <Typography fontWeight={700}>Total: ${total.toFixed(2)}</Typography>
        <Button
          variant="contained"
          component={Link}
          to="/checkout"
          sx={{ borderRadius: 2, px: 4, py: 1.2 }}
        >
          Checkout
        </Button>
      </Box>
    </Container>
  );
}
