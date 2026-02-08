import { loadHeaderFooter } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";
import { renderCartTotal, removeFromCart } from "./shoppingCart.mjs";

await loadHeaderFooter();
shoppingCart();
renderCartTotal();

// event listener to remove item from cart
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remove")) {
    removeFromCart(event.target.dataset.id);
  }
});