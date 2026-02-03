import productList from "./productList.mjs";
import { updateCartCount } from "./cart.js";

productList(".product-list", "tents");
updateCartCount();