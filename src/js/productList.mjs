import {getData} from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

// template for the product card list
function productCardTemplate(product, category) {
    // Calculate discount values
    const discountAmount = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
    const discountPercent = Math.round((discountAmount / product.SuggestedRetailPrice) * 100);
    const imageUrl = product.Images.PrimaryMedium;
    
    return `<li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}&category=${category}">
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

// get the list of products
export default async function productList(selector, category) {
    
    // get the element we will insert the list into from the selector
    const el = document.querySelector(selector);
    // get the list of products 
    const products = await getData(category);

    const title = document.querySelector(".title");
    title.innerText = category.charAt(0).toUpperCase() + category.slice(1);
    // render out the product list to the element
    renderListWithTemplate(
        (product) => productCardTemplate(product, category), 
        el, 
        products
    );
}
