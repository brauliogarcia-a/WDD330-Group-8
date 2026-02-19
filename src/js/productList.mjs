import {getData} from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

// template for the product card list
function productCardTemplate(product) {
    // Calculate discount values
    const discountAmount = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
    const discountPercent = Math.round((discountAmount / product.SuggestedRetailPrice) * 100);
    const imageUrl = product.Image;
    
    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
            <div class="discount-flag">${discountPercent}% OFF</div>
            <img src="${imageUrl}" alt="${product.Name}" />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            
            <p class="product-card__price">
                <span class="final-price">$${product.FinalPrice}</span>
                <span class="original-price">$${product.SuggestedRetailPrice}</span>
            </p>
            <p class="product-card__savings">You save: $${discountAmount}</p>
        </a>
    </li>`;
}

// verify that the image exists
async function isImageValid(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);  
        img.onerror = () => resolve(false); 
        img.src = url;
    });
}

// get the list of products
export default function productList(selector, category) {
    const el = document.querySelector(selector);
    const products = getData(category);

    if (!el) return;

    const limitedProducts = products.slice(0, 4);

    renderListWithTemplate(productCardTemplate, el, limitedProducts);
}
