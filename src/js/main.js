import { loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";

async function initPage() {
  loadHeaderFooter();
  productList(".product-list", "tents");
}

initPage();


