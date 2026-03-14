import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, updateCartCount, renderBreadcrumbs, alertMessage, updateWishlistCount } from "./utils.mjs";

let product = {};

function showError(message) {
  const errorEl = document.getElementById("productError");
  if (!errorEl) return;

  const productSection = document.querySelector(".product-detail");
  if (productSection) productSection.style.display = "none";

  errorEl.innerHTML = `${message} <a href="../index.html">Back to home</a>`;
  errorEl.style.display = "block";
}

// function to get the details for the current product
export default async function productDetails(productId) {
  if (!productId) {
    showError("No product selected.");
    return;
  }

  try {
    // get the details for the current product. findProductById will return a promise! use await or .then() to process it
    product = await findProductById(productId);
  } catch (err) {
    showError("Product not found.");
    return;
  }

  // Validate response: some APIs may return a product object with missing data
  const hasRequiredFields = product && product.Id && product.Name && product.Brand?.Name && product.Images?.PrimaryLarge;

  if (!hasRequiredFields) {
    showError("Product not found.");
    return;
  }

  // Render breadcrumbs with product name
  renderBreadcrumbs("product", null, product.NameWithoutBrand);

  // once we have the product details we can render out the HTML
  renderProductDetails();
  // add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
  // add a listener to Add to Wishlist button
  document.getElementById("addToWishlist").addEventListener("click", addToWishlist);
}

// function to add the product to the cart
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

// function to add the product to the wishlist
function addToWishlist() {
  let wishlist = getLocalStorage("so-wishlist");
  if (!Array.isArray(wishlist)) {
    wishlist = [];
  }
  
  // Check if the item is already in the wishlist
  const existingItem = wishlist.find((item) => item.Id === product.Id);

  if (!existingItem) {
    // If it's not in wishlist, add it
    wishlist.push(product);
    setLocalStorage("so-wishlist", wishlist);
    updateWishlistCount();
    alertMessage("Added to wishlist!", true, "success");
  } else {
    alertMessage("Already in wishlist!", true, "success");
  }
}

// function to render the product details
function renderProductDetails() {
  // Populate standard fields
  document.querySelector("#productName").innerText = product.Brand?.Name || "";
  document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand || "";
  document.querySelector("#productImage").src = product.Images?.PrimaryLarge || "";
  document.querySelector("#productImage").alt = product.Name || "";
  document.querySelector("#productFinalPrice").innerText = `$${product.FinalPrice ?? ""}`;
  document.querySelector("#productColorName").innerText = product.Colors?.[0]?.ColorName || "";
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple || "";
  document.querySelector("#addToCart").dataset.id = product.Id || "";
  
  // Discount and Original Price Logic
  const msrp = product.SuggestedRetailPrice;
  const final = product.FinalPrice;
    
    if (msrp > final) {
        const savings = (msrp - final).toFixed(2);
        const percent = Math.round((savings / msrp) * 100);
        
        document.getElementById("productSuggestedPrice").innerText = `Price: $${msrp.toFixed(2)}`;
        document.getElementById("discountFlag").innerText = `${percent}% OFF`;
        document.getElementById("savings").innerText = `You save $${savings}!`;
        
        // Ensure they are visible
        document.getElementById("productSuggestedPrice").style.display = "block";
        document.getElementById("discountFlag").style.display = "block";
    } else {
        // Hide discount elements if there is no discount
        document.getElementById("productSuggestedPrice").style.display = "none";
        document.getElementById("discountFlag").style.display = "none";
        document.getElementById("savings").innerText = "";
    }
}