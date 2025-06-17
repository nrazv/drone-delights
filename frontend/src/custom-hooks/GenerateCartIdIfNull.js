import React, { useContext } from "react";
import LocalStorageManager from "../state/LocalStorageManager";

const GenerateCartIdIfNull = () => {
  const localStorageManager = new LocalStorageManager("cartId");
  const cartId = localStorageManager.getItem();

  if (cartId == null) {
    const newCatId = crypto.randomUUID();
    localStorageManager.setNewItem(newCatId);
  }
};

export default GenerateCartIdIfNull;
