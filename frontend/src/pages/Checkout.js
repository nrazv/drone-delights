import { Box, Grid, Typography } from "@mui/material";

import ProductsTable from "../components/ProductsTable";

function Checkout() {
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
          <ProductsTable />
        </Grid>
        <Grid size={6}>Column 2</Grid>
      </Grid>
    </Box>
  );
}

export default Checkout;
