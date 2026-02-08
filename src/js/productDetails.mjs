import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage, updateCartCount } from "./utils.mjs";

let product = {};

// function to get the details for the current product
export default async function productDetails(productId, selector) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails(product);
  // add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

// function to add the product to the cart
function addToCart() {
  let cart = getLocalStorage("so-cart");
  if (!Array.isArray(cart)) {
    cart = [];
  }
  cart.push(product);
  setLocalStorage("so-cart", cart);
  updateCartCount();
}

// function to render the product details
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