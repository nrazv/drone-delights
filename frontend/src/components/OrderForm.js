import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AppContext from "../state/AppContext";
import { useNavigate } from "react-router-dom";

const COUNTRIES = [{ code: "SE", label: "Sweden" }];

function OrderForm() {
  const [values, setValues] = useState({
    email: "",
    emailConfirmation: "",
    country: "",
    fullName: "",
    street: "",
    apt: "",
    postal: "",
    city: "",
  });

  const navigate = useNavigate();

  const { setShippingAddress } = React.useContext(AppContext);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    [
      "email",
      "emailConfirmation",
      "country",
      "fullName",
      "street",
      "city",
    ].forEach((field) => {
      if (!values[field]?.trim()) newErrors[field] = "Required";
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.email && !emailRegex.test(values.email)) {
      newErrors.email = "Invalid e‑mail";
    }

    if (
      values.email &&
      values.emailConfirmation &&
      values.email !== values.emailConfirmation
    ) {
      newErrors.emailConfirmation = "E‑mails don’t match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setShippingAddress(values);
    navigate("/payment");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "grid", gap: 1.5, maxWidth: 600, mx: "auto" }}
    >
      <TextField
        name="email"
        label="E‑mail"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        required
      />

      <TextField
        name="emailConfirmation"
        label="Confirm E‑mail"
        type="email"
        value={values.emailConfirmation}
        onChange={handleChange}
        error={!!errors.emailConfirmation}
        helperText={errors.emailConfirmation}
        required
      />

      <FormControl required error={!!errors.country}>
        <InputLabel id="country-label">Country</InputLabel>
        <Select
          labelId="country-label"
          name="country"
          label="Country"
          value={values.country}
          onChange={handleChange}
        >
          {COUNTRIES.map((c) => (
            <MenuItem key={c.code} value={c.code}>
              {c.label}
            </MenuItem>
          ))}
        </Select>
        {errors.country && (
          <Typography variant="caption" color="error">
            {errors.country}
          </Typography>
        )}
      </FormControl>

      <TextField
        name="fullName"
        label="Full Name"
        value={values.fullName}
        onChange={handleChange}
        error={!!errors.fullName}
        helperText={errors.fullName}
        required
      />

      <TextField
        name="street"
        label="Street Address"
        value={values.street}
        onChange={handleChange}
        error={!!errors.street}
        helperText={errors.street}
        required
      />

      <TextField
        name="apt"
        label="Apt / Suite / Other (optional)"
        value={values.apt}
        onChange={handleChange}
      />

      <TextField
        name="postal"
        label="Postal Code (optional)"
        value={values.postal}
        onChange={handleChange}
      />

      <TextField
        name="city"
        label="City"
        value={values.city}
        onChange={handleChange}
        error={!!errors.city}
        helperText={errors.city}
        required
      />

      <Button variant="contained" type="submit">
        Continue to Payment
      </Button>
    </Box>
  );
}

export default OrderForm;
