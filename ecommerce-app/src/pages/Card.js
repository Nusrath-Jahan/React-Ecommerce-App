import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Card, CardContent } from "@mui/material";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { Link } from "react-router-dom";
function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <Typography variant="h5">Your cart is empty</Typography>;
  }
  return (
    <div>
      <Typography variant="h4">Your Cart</Typography>
      {cart.map((item) => (
        <Card key={item.id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">{item.title}</Typography>
            <Typography>
              ${item.price} * {item.quantity}
            </Typography>
            <Button onClick={() => dispatch(increaseQty(item.id))}>+</Button>
            <Button onClick={() => dispatch(decreaseQty(item.id))}>-</Button>
            <Button
              color="error"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
      <Typography>Total: ${total.toFixed(2)}</Typography>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        component={Link}
        to="/checkout"
      >
        Checkout
      </Button>
    </div>
  );
}

export default Cart;

