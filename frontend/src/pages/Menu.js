import React from "react";
import SearchAndFilter from "../components/SearchAndFilter";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import MenuProduct from "../components/MenuProduct";

function Menu() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:3004/products";

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <SearchAndFilter />
      <Box
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        {products.map((p) => (
          <MenuProduct
            key={p.id}
            name={p.name}
            price={p.price}
            calories={p.calories}
            image={p.image}
          />
        ))}
      </Box>
    </>
  );
}

export default Menu;
