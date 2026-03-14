import productList from "./productList.mjs";
import { loadHeaderFooter, getParam, renderBreadcrumbs } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
renderBreadcrumbs("category", category);
productList(".product-list", category);
