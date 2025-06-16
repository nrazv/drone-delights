import React from "react";
import { Box, Typography } from "@mui/material";
import "./ProductMenu.css";
import Button from "@mui/material/Button";
import ProductsContext from "../state/ProductsContext";

function MenuProduct({ product }) {
  const { addProduct } = React.useContext(ProductsContext);
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
      <img className="product-image" alt={product.name} src={product.image} />
      <Typography variant="subtitle2" mt={1}>
        {product.name} - {product.price} $
      </Typography>
      <div style={{ marginTop: "10px" }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => addProduct(product)}
        >
          Add to cart
        </Button>
      </div>
    </Box>
  );
}

export default MenuProduct;
