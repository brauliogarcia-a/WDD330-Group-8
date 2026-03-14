import { loadHeaderFooter, renderBreadcrumbs } from "./utils.mjs";
import wishlist from "./wishlist.mjs";
import {removeFromWishlist, addWishlistToCart } from "./wishlist.mjs";

loadHeaderFooter();
renderBreadcrumbs("wishlist");
wishlist();

// event listener to remove item from wishlist
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remove-wishlist")) {
    removeFromWishlist(event.target.dataset.id);
  }
  
  // event listener for add to cart from wishlist
  if (event.target.classList.contains("btn-add-to-cart")) {
    addWishlistToCart(event.target.dataset.id);
  }
});