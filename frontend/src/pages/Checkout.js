import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

import ProductsTable from "../components/ProductsTable";
import AppContext from "../state/AppContext";

function Checkout() {
  const { cartItems } = React.useContext(AppContext);

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );
    return Math.round(total * 100) / 100;
  };

  return (
    <Box sx={{ p: 2, flexGrow: 1 }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          textAlign: "left",
          textTransform: "uppercase",
          fontWeight: "bold",
          paddingLeft: 40,
        }}
      >
        Your Cart
      </Typography>
      <Grid container spacing={1} margin={3}>
        <Grid size={6}>
          <Box sx={{ height: 550 }}>
            <ProductsTable />
          </Box>
          <Box
            sx={{
              alignContent: "start",
              display: "flex",
              alignItems: "end",
            }}
          >
            <TextField label="Coupon code" variant="standard" />
            <Button
              variant="outlined"
              sx={{ marginX: 5, borderRadius: 5, paddingX: 4 }}
            >
              Apply
            </Button>
            <Typography
              variant="h5"
              gutterBottom
              style={{
                fontWeight: "bold",
                marginLeft: "auto",
                marginRight: 30,
              }}
            >
              Total: {calculateTotal()}
            </Typography>
          </Box>
        </Grid>
        <Grid size={6}>Column 2</Grid>
      </Grid>
    </Box>
  );
}

export default Checkout;
