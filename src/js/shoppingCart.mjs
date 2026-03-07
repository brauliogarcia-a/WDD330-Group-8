import { getLocalStorage, setLocalStorage, updateCartCount, renderListWithTemplate } from "./utils.mjs";

// function to render cart
export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    return; // Stop the function here
  }
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  renderCartTotal();
}

// function to create HTML for each cart item
function cartItemTemplate(item) {
  const subtotal = (item.FinalPrice * item.Quantity).toFixed(2);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images?.PrimaryMedium || item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity}</p>
  <p class="cart-card__price">$${subtotal}</p>
  <span class="btn-remove" data-id="${item.Id}">X</span>
  </li>`;

  return newItem;
}

// function to get total in cart
function totalInCart() {
  const cart = getLocalStorage("so-cart") || [];
  let total = 0;
 
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].FinalPrice * (cart[i].Quantity || 1);
  }
  return total;
}

// function to update total in cart
export function renderCartTotal() {
  const total = totalInCart();
  
  // if there are no items in the cart make total hiden
  if (total != 0) {
    document.querySelector(".cart-total").style.display = "block";
    document.querySelector("#total").innerText = `${total}`;  
  }
  else{
    document.querySelector(".cart-total").style.display = "none";
  }
}

// function to remove item from cart
export function removeFromCart(id) {
  const cart = getLocalStorage("so-cart");
  
  // find the index of the item
  const index = cart.findIndex((item) => item.Id === id);

  //  Remove the item
  if (index !== -1) {
    cart.splice(index, 1); 
  }

  // Update the cart
  setLocalStorage("so-cart", cart);

  // re-render
  ShoppingCart();
  renderCartTotal();
  updateCartCount();
}
