import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import useCartUtilities from "../utilities/fetchUtilities";

function ProductControl({ product }) {
  const { increaseQuantity, decreaseQuantity } = useCartUtilities();

  return (
    <ButtonGroup size="small" variant="contained">
      <Button onClick={() => decreaseQuantity(product)}>-</Button>
      <Button
        sx={{
          "&.Mui-disabled": {
            color: "grey.800",
            backgroundColor: "white",
          },
        }}
        disabled
      >
        {product.quantity}
      </Button>
      <Button onClick={() => increaseQuantity(product)}>+</Button>
    </ButtonGroup>
  );
}

export default ProductControl;
