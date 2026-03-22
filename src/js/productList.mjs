import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

// template for the product card list
function productCardTemplate(product) {
    // Calculate discount values
    const discountAmount = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
    const discountPercent = Math.round((discountAmount / product.SuggestedRetailPrice) * 100);
    const imageUrl = product.Images.PrimaryMedium;
    
    return `<li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
            <div class="discount-flag">${discountPercent}% OFF</div>
            <img
                src="${product.Images.PrimaryMedium}"
                alt="Image of ${product.Name}"
            />
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
    const products = await getProductsByCategory(category);

    //Search Bar
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search");

    let filteredProducts = products;

    if (searchQuery) {
        filteredProducts = products.filter(product =>
            product.Name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Get the list of products continuation
    renderListWithTemplate(productCardTemplate, el, products);
    document.querySelector(".title").innerHTML = category;
}
