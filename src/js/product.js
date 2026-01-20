import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
let cart;
function addProductToCart(product) {
  cart = getLocalStorage("so-cart");
  if (!Array.isArray(cart)) {
    cart = cart ? [cart] : []; 
  }
  cart.push(product);
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
