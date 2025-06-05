import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import { Link } from "react-router-dom";

const ITEM_HEIGHT = 80;

function Navbar() {
  const [shoppingCartItems, setShoppingCarItems] = useState([
    {
      id: 1,
      name: "Cheeseburger",
      category: "Burger",
      brand: "McDonald's",
      price: 3.99,
      calories: 300,
      image:
        "https://www.mcdonalds.ro/sites/default/files/styles/500x500/public/field_product_image/2022-07/CB.png?itok=jtRojji4",
    },
    {
      id: 2,
      name: "Big Mac",
      category: "Burger",
      brand: "McDonald's",
      price: 5.49,
      calories: 550,
      image:
        "https://www.mcdonalds.ro/sites/default/files/styles/500x500/public/field_product_image/2022-07/BM.png?itok=JaRbeO6z",
    },
  ]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#FFA07A" }}>
        <Toolbar sx={{ ml: "auto" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              component="div"
              mx={3}
              color="black"
            >
              Home
            </Typography>
          </Link>
          <Link to="/menu" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              component="div"
              color="black"
              mx={3}
            >
              Menu
            </Typography>
          </Link>
          <IconButton aria-label="cart" onClick={handleClick}>
            <ShoppingCartIcon sx={{ fill: "black", fontSize: 28 }} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                },
              },
            }}
          >
            {shoppingCartItems.map((p) => (
              <MenuItem
                disableRipple
                key={p.id}
                sx={{ justifyContent: "center" }}
              >
                <ShoppingCartItem
                  name={p.name}
                  price={p.price}
                  image={p.image}
                />
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
