import React from "react";
import { CreditCardForm } from "../components/CreditCardForm";
import { Box, Typography } from "@mui/material";
import AppContext from "../state/AppContext";

function Payment() {
  const { cartItems } = React.useContext(AppContext);

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );
    return Math.round(total * 100) / 100;
  };

  return (
    <Box padding={10}>
      <CreditCardForm />
      <Typography
        variant="h5"
        gutterBottom
        style={{
          fontWeight: "bold",
          margin: 20,
        }}
      >
        Total Payment: ${calculateTotal()}
      </Typography>
    </Box>
  );
}

export default Payment;
