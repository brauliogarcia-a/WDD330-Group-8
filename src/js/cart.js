import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  // 1. Check if cartItems exists AND is an array
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    return; // Stop the function here
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
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
  <spam class="btn-remove" id="removeFromCart" data-id="${item.Id}")">X</spam>
</li>`;

  return newItem;
}

renderCartContents();
export function updateCartCount() {
  getLocalStorage('so-cart');
  const count = getLocalStorage('so-cart').length;
  document.getElementById('cart-count').innerText = count;
} 

async function totalInCart() {
  const cart = getLocalStorage('so-cart');
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].FinalPrice;
  }
  return total;
}

async function updateTotal() {
  const total = await totalInCart();
  document.getElementById('total').innerText = total;
  // if there are no items in the cart make total hiden
  if (total === 0) {
    document.getElementById('cart-total').style.display = 'none';
  }
  else{
    document.getElementById('cart-total').style.display = 'block';
  }
}
updateTotal();
function removeFromCart(id) {
  const cart = getLocalStorage('so-cart');
  const newCart = cart.filter((item) => item.Id !== id);
  setLocalStorage('so-cart', newCart);
  renderCartContents();
}

document.addEventListener('click', (event) => {
  if (event.target.id === 'removeFromCart') {
    removeFromCart(event.target.dataset.id);
  }
});
