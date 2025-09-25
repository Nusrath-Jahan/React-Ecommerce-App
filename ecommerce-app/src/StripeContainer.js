import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./pages/CheckoutForm";

const PUBLIC_KEY =
  "pk_test_51SB96KF58yeHwa6E2pIkVq7otwx48hhHUk6VtGv8G9p2Q6EBxvz7L5nhgn67jcf88Ph1ICDwGD9Bbg3vfzg7q1c200nvDrFQ6T";
const stripePromise = loadStripe(PUBLIC_KEY);

function StripeContainer() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default StripeContainer;
