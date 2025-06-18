import React from "react";
import { CreditCardForm } from "../components/CreditCardForm";
import { Box } from "@mui/material";

function Payment() {
  return (
    <Box padding={10}>
      <CreditCardForm />
    </Box>
  );
}

export default Payment;
