import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import usePlaceOrder from "../custom-hooks/PlaceOrder";

export function CreditCardForm() {
  const { placeOrder } = usePlaceOrder();
  const [values, setValues] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const timer = useRef(undefined);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    ["cardName", "cardNumber", "expDate", "cvv"].forEach((field) => {
      if (!values[field]?.trim()) newErrors[field] = "Required";
    });

    const cleanNumber = values.cardNumber.replace(/\s+/g, "");
    const numberRegex = /^\d{13,19}$/;
    if (cleanNumber && !numberRegex.test(cleanNumber)) {
      newErrors.cardNumber = "Invalid card number";
    }

    const expRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    if (values.expDate && !expRegex.test(values.expDate)) {
      newErrors.expDate = "Invalid date (MM/YY)";
    }

    const cvvRegex = /^\d{3,4}$/;
    if (values.cvv && !cvvRegex.test(values.cvv)) {
      newErrors.cvv = "Invalid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    else {
      setLoading(true);
      placeOrder();
      timer.current = setTimeout(() => {
        setLoading(false);
        setOpen(true);
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "grid", gap: 2, maxWidth: 400, mx: "auto" }}
    >
      <Typography variant="h5" fontWeight="bold">
        Credit Card Payment
      </Typography>

      <TextField
        name="cardName"
        label="Cardholder Name"
        value={values.cardName}
        onChange={handleChange}
        error={!!errors.cardName}
        helperText={errors.cardName}
        required
      />

      <TextField
        name="cardNumber"
        label="Card Number"
        value={values.cardNumber}
        onChange={handleChange}
        error={!!errors.cardNumber}
        helperText={errors.cardNumber}
        required
        inputProps={{ inputMode: "numeric", pattern: "[0-9 ]*" }}
        placeholder="1234 5678 9012 3456"
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          name="expDate"
          label="Exp. Date (MM/YY)"
          value={values.expDate}
          onChange={handleChange}
          error={!!errors.expDate}
          helperText={errors.expDate}
          required
          sx={{ flex: 1 }}
          placeholder="MM/YY"
        />

        <TextField
          name="cvv"
          label="CVV"
          value={values.cvv}
          onChange={handleChange}
          error={!!errors.cvv}
          helperText={errors.cvv}
          required
          sx={{ flex: 1 }}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 4 }}
        />
      </Box>

      <Button
        variant="contained"
        size="large"
        type="submit"
        sx={{ mt: 1 }}
        loading={loading}
      >
        Pay Now
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Thank you! Your payment was successful!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CreditCardForm;
