import React from "react";
import { Box, Typography } from "@mui/material";
import "./ProductMenu.css";
import ProductControl from "./ProductControl";

function MenuProduct({ name, brand, price, calories, image }) {
  return (
    <Box
      margin={2}
      width={240}
      height={326}
      borderRadius={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        border: "solid 3px gray",
      }}
    >
      <img className="product-image" src={image} />
      <Typography variant="subtitle2" mt={1}>
        {name} - {price} $
      </Typography>
      <div style={{ marginTop: "10px" }}>
        <ProductControl />
      </div>
    </Box>
  );
}

export default MenuProduct;
