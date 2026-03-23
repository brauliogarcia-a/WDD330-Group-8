//Import
import { getProductsByCategory, getAllProducts } from "./externalServices.mjs";
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

//This sorts the products depending on the selected option
function sortProducts(products, sortOption) {
    const sortedProducts = [...products];

    if (sortOption === "name-asc") {
        sortedProducts.sort((a, b) =>
            a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)
        );
    } else if (sortOption === "name-desc") {
        sortedProducts.sort((a, b) =>
            b.NameWithoutBrand.localeCompare(a.NameWithoutBrand)
        );
    } else if (sortOption === "price-asc") {
        sortedProducts.sort((a, b) => a.FinalPrice - b.FinalPrice);
    } else if (sortOption === "price-desc") {
        sortedProducts.sort((a, b) => b.FinalPrice - a.FinalPrice);
    }

    return sortedProducts;
}

//Get the list of products and renders them on the page
export default async function productList(selector, category) {

    //Get the element we will insert the list into from the selector
    const el = document.querySelector(selector);

    //Read the search word from the url
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search");

    let products = [];

    //If there is a search word, get ALL products
    //This makes the search global by product name
    if (searchQuery) {
        products = await getAllProducts();
    }
    //If there is no search word, keep the old category behavior
    else if (category) {
        products = await getProductsByCategory(category);
    }
    //If there is no search and no category, show a message
    else {
        el.innerHTML = `<p>No category or search was provided.</p>`;
        return;
    }

    let filteredProducts = products;
    
    //Advanced Filter
    if (searchQuery) {
        filteredProducts = products.filter(product =>
            product.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.Brand.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.NameWithoutBrand.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // If no products match, show message
    if (filteredProducts.length === 0) {
        el.innerHTML = `<p>No products found for "${searchQuery}"</p>`;

        const titleElement = document.querySelector(".title");
        if (titleElement) {
            titleElement.innerHTML = `Search: ${searchQuery}`;
        }

        return;
    }


    //Function to render products with current sort
    function renderSortedProducts() {
        const sortSelect = document.querySelector("#sortProducts");
        const sortOption = sortSelect ? sortSelect.value : "default";

        const sortedProducts = sortProducts(filteredProducts, sortOption);

        el.innerHTML = "";
        renderListWithTemplate(productCardTemplate, el, sortedProducts);
    }

    //First render
    renderSortedProducts();

    //Update the page title
    const titleElement = document.querySelector(".title");
    if (titleElement) {
        titleElement.innerHTML = searchQuery
            ? `Search: ${searchQuery}`
            : category;
    }

    // Listen for sort changes
    const sortSelect = document.querySelector("#sortProducts");
    sortSelect?.addEventListener("change", renderSortedProducts);
}
