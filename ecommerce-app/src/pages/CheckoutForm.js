import React from "react";
import {
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import { Button, Typography } from "@mui/material";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      console.log("PaymentMethod created:", paymentMethod);
      alert("Payment successful!");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Checkout
      </Typography>
      <CardElement />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!stripe}
      >
        Pay
      </Button>
    </form>
  );
}

export default CheckoutForm;
