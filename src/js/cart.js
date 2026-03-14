import { loadHeaderFooter, renderBreadcrumbs } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";
import {removeFromCart, changeQuantity } from "./shoppingCart.mjs";

loadHeaderFooter();
renderBreadcrumbs("cart");
shoppingCart();

// event listener to remove item from cart
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remove")) {
    removeFromCart(event.target.dataset.id);
  }
  
  // event listener for quantity change buttons
  if (event.target.classList.contains("btn-quantity")) {
    const action = event.target.dataset.action;
    const id = event.target.dataset.id;
    
    if (action === "increase") {
      changeQuantity(id, 1);
    } else if (action === "decrease") {
      changeQuantity(id, -1);
    }
  }
});