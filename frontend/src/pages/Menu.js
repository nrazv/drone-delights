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
    <div>
      <SearchAndFilter />
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        justifyItems="center"
        gap={2}
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
    </div>
  );
}

export default Menu;
