import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import React, { useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartItem from "./ShoppingCartItem";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AppContext from "../state/AppContext";

const ITEM_HEIGHT = 80;

function Navbar() {
  const { shoppingCartId } = React.useContext(AppContext);
  const [cartItems, setCartItems] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getCartItems = async () => {
    const apiUrl = "http://localhost:3004/shoppingCarts";

    try {
      const URL = `${apiUrl}?cartId=${shoppingCartId}`;
      const response = await fetch(URL, {
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      setCartItems([...data]);
    } catch (err) {}
  };

  useEffect(() => {
    (async () => {
      await getCartItems();
    })();
  }, [open]);

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
                  maxHeight: ITEM_HEIGHT * 4.7,
                },
              },
            }}
          >
            <div
              style={{
                maxHeight: "300px",
                overflow: "scroll",
                scrollbarGutter: "stable",
                overflowX: "hidden",
              }}
            >
              {cartItems.length > 0 &&
                cartItems.map((p) => (
                  <MenuItem
                    disableRipple
                    key={p.id}
                    sx={{ justifyContent: "center" }}
                  >
                    <ShoppingCartItem
                      name={p.name}
                      price={p.price}
                      image={p.image}
                      quantity={p.quantity}
                    />
                  </MenuItem>
                ))}
            </div>
            <MenuItem
              disableRipple
              disableTouchRipple
              sx={{ justifyContent: "center" }}
            >
              <Button size="small" fullWidth variant="contained" color="error">
                Checkout
              </Button>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
