import { getLocalStorage, setLocalStorage, renderListWithTemplate, updateWishlistCount } from "./utils.mjs";

// function to render wishlist
export default function Wishlist() {
  const wishlistItems = getLocalStorage("so-wishlist");
  const outputEl = document.querySelector(".product-list");
  if (!wishlistItems || !Array.isArray(wishlistItems) || wishlistItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your wishlist is empty.</p>";
    updateWishlistCount();
    return; // Stop the function here
  }
  renderListWithTemplate(wishlistItemTemplate, outputEl, wishlistItems);
  updateWishlistCount();
}

// function to create HTML for each wishlist item
function wishlistItemTemplate(item) {
  return `<li class="wishlist-card divider">
  <a href="#" class="wishlist-card__image">
    <img
      src="${item.Images?.PrimaryMedium || item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="../product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="wishlist-card__color">${item.Colors[0].ColorName}</p>
  <p class="wishlist-card__price">$${item.FinalPrice}</p>
  <button class="btn-remove-wishlist" data-id="${item.Id}">Remove</button>
  <button class="btn-add-to-cart" data-id="${item.Id}">Add to Cart</button>
  </li>`;
}

// function to remove item from wishlist
export function removeFromWishlist(id) {
  const wishlist = getLocalStorage("so-wishlist");
  
  // find the index of the item
  const index = wishlist.findIndex((item) => item.Id === id);

  //  Remove the item
  if (index !== -1) {
    wishlist.splice(index, 1); 
  }

  // Update the wishlist
  setLocalStorage("so-wishlist", wishlist);

  // re-render
  Wishlist();
}

// function to add item from wishlist to cart
export function addWishlistToCart(id) {
  const wishlist = getLocalStorage("so-wishlist");
  const cart = getLocalStorage("so-cart") || [];
  
  // find the item in wishlist
  const item = wishlist.find((item) => item.Id === id);
  
  if (item) {
    // Check if the item is already in the cart
    const existingItem = cart.find((cartItem) => cartItem.Id === item.Id);

    if (existingItem) {
      // If it exists, increment the quantity
      existingItem.Quantity = (existingItem.Quantity || 1) + 1;
    } else {
      // If it's new, add a Quantity property and push it
      item.Quantity = 1;
      cart.push(item);
    }

    setLocalStorage("so-cart", cart);
    
    // Remove from wishlist after adding to cart
    removeFromWishlist(id);
  }
}

