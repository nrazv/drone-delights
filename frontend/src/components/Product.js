import { Box, Typography } from "@mui/material";
import "./Product.css";

function Product({ name, brand, price, calories, image }) {
  return (
    <Box
      width={240}
      height={326}
      borderRadius={1}
      sx={{ border: "solid 3px gray" }}
    >
      <img className="product-image" src={image} />
      <Typography variant="subtitle2" mt={1}>
        {name} - {price} $
      </Typography>
    </Box>
  );
}

export default Product;
