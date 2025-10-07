import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#424770",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      "::placeholder": { color: "#aab7c4" },
      padding: "10px 12px",
    },
    invalid: { color: "#9e2146" },
  },
};

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      console.log("PaymentMethod created:", paymentMethod);
      alert("Payment successful!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        bgcolor: "#f5f6fa",
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: "100%",
          p: 2,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Checkout
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Enter your payment details securely below.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                mb: 2,
                backgroundColor: "#fff",
              }}
            >
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!stripe || loading}
              sx={{ py: 1.2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Pay Now"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CheckoutForm;
