import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

async function initPage() {
  loadHeaderFooter();
  await productList(".product-list", "tents");
}

initPage();


