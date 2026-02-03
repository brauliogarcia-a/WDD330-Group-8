import { qs } from "./utils.mjs"; 
import { getData } from "./productData.mjs";

function productCardTemplate(product) {
    return `
      <li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
          <img src="${product.Image}" alt="${product.Name}" />
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.NameWithoutBrand}</h2>
          <p class="product-card__price">${product.FinalPrice}</p>
        </a>
      </li>
    `;
}

function renderProductList(products, container) {
    container.innerHTML = products.map(productCardTemplate).join("");
}
export default async function productList(selector, category = "tents") {
    // get the element we will insert the list into from the selector
    const container = qs(selector);
    // get the data from json
    const products = await getData(category);
    // render the list
    renderProductList(products, container);
}
