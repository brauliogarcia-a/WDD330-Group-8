import productList from "./productList.mjs";
import { updateCartCount } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

productList(".product-list", "tents");
updateCartCount();

