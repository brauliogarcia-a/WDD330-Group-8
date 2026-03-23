//Imports
import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

//This function will load the header and footer first
//Then, the logic to load the product details, and finally will load the logic for the search
async function init() {
  //Load header and footer first
  await loadHeaderFooter();

  //Product page logic
  const productId = getParam("product");
  if (productId) {
    productDetails(productId);
  }

  //Search bar logic only for this page
  const searchForm = document.querySelector("#searchForm");
  const searchInput = document.querySelector("#searchInput");

  searchForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = searchInput?.value.trim();
    if (!query) return;

    window.location.href = `/product-list/index.html?search=${encodeURIComponent(query)}`;
  });
}

init();