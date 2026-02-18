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

// function to render the product details
function renderProductDetails(product) {
    // Populate standard fields
    document.getElementById("productName").innerText = product.Brand;
    document.getElementById("productNameWithoutBrand").innerText = product.NameWithoutBrand;
    const imageUrl = new URL(
    `../images/${product.Image.split("/images/")[1]}`,
    import.meta.url
    ).href;
    document.getElementById("productImage").src = product.Image;
    document.getElementById("productFinalPrice").innerText = `$${product.FinalPrice}`;
    document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    
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