import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

loadHeaderFooter();
const productId = getParam("product");
//const category = getParam("category");
productDetails(productId);
// productDetails(productId, category);