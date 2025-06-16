import React from "react";
import SearchAndFilter from "../components/SearchAndFilter";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import MenuProduct from "../components/MenuProduct";
import ProductsContext from "../state/ProductsContext";

function Menu() {
  const [products, setProducts] = useState([]);

  const apiUrl = "http://localhost:3004/products";

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {});
  };

  const search = (searchText) => {
    const url = apiUrl + `?q=${searchText}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {});
  };

  const searchByCategories = (categories) => {
    let query = "";

    categories.forEach((e) => {
      query += `category=${e}&`;
    });

    const url = apiUrl + "?" + query;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {});
  };

  const handleChange = (e) => {
    search(e.target.value.toLowerCase());
  };

  const filterByCategories = (categories) => {
    searchByCategories(categories);
  };

  return (
    <div>
      <SearchAndFilter
        handelSearch={handleChange}
        handelFilterChange={filterByCategories}
      />
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        justifyItems="center"
        gap={2}
      >
        {products.map((p) => (
          <MenuProduct key={p.id} product={p} />
        ))}
      </Box>
    </div>
  );
}

export default Menu;
