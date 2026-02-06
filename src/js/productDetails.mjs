import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./utils.mjs";

let product = {};

export default async function productDetails(productId, selector) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails(product);
  // add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
  // add a listener to the remove from cart button
}

function addToCart() {
  let cart = getLocalStorage("so-cart");
  if (!Array.isArray(cart)) {
    cart = [];
  }
  
  // Check if the item is already in the cart
  const existingItem = cart.find((item) => item.Id === product.Id);

  if (existingItem) {
    // If it exists, increment the quantity
    existingItem.Quantity = (existingItem.Quantity || 1) + 1;
  } else {
    // If it's new, add a Quantity property and push it
    product.Quantity = 1;
    cart.push(product);
  }

  setLocalStorage("so-cart", cart);
  updateCartCount();
}

function renderProductDetails(product) {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = "$" + product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  //add the product Id to the add button! 
  document.querySelector("#addToCart").dataset.id = product.Id;
}