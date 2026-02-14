import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

await loadHeaderFooter();
productList(".product-list", "tents");
