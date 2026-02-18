import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

async function initPage() {
  await loadHeaderFooter();
  productList(".product-list", "tents");
}

initPage();


