export default class LocalStorageManager {
  constructor(itemName) {
    this.itemName = itemName;
  }

  getItem() {
    return JSON.parse(localStorage.getItem(this.itemName));
  }

  setNewItem(value) {
    localStorage.setItem(this.itemName, JSON.stringify(value));
  }

  removeItem() {
    localStorage.removeItem(this.itemName);
  }
}
