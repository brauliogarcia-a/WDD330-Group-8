import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

// Initialize
renderCartContents();
renderCartTotal();
updateCartCount();

// function to create HTML for each cart item
function cartItemTemplate(item) {
  console.log("cartItemTemplate");
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="btn-remove" data-id="${item.Id}">X</span>
</li>`;

  return newItem;
}

// function to render cart contents
function renderCartContents() {
  console.log("renderCartContents");
  const cartItems = getLocalStorage("so-cart");
 
  // 1. Check if cartItems exists AND is an array
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    return; // Stop the function here
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// function to get total in cart
function totalInCart() {
  console.log("totalInCart");
  const cart = getLocalStorage('so-cart') || [];
  let total = 0;
 
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].FinalPrice;
  }
  return total;
}

// function to update total in cart
function renderCartTotal() {
  console.log("renderCartTotal");
  const total = totalInCart();
  
  // if there are no items in the cart make total hiden
  if (total != 0) {
    document.querySelector('.cart-total').style.display = 'block';
    document.querySelector('#total').innerText = `${total.toFixed(2)}`;  
  }
  else{
    document.querySelector('.cart-total').style.display = 'none';
  }
}

// function to remove item from cart
function removeFromCart(id) {
  const cart = getLocalStorage('so-cart');
  
  // find the index of the item
  const index = cart.findIndex((item) => item.Id === id);

  //  Remove the item
  if (index !== -1) {
    cart.splice(index, 1); 
  }

  // Update the cart
  setLocalStorage('so-cart', cart);

  // re-render
  renderCartTotal();
  renderCartContents(); 
  updateCartCount();
}

// event listener to remove item from cart
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-remove')) {
    removeFromCart(event.target.dataset.id);
  }
});
