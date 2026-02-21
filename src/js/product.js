import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

loadHeaderFooter();
const productId = getParam("product");
const category = getParam("category"); // Necesitas obtener la categoría de la URL

console.log("ID:", productId);
console.log("Categoría:", category);

// Llamada corregida: pasamos el ID y la Categoría real, no un selector
productDetails(productId, category);