//Import
import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

async function init() {
  //Load header & footer
    await loadHeaderFooter();

  //Search Bar
  const category = getParam("category");
  productList(".product-list", category);

  const searchForm = document.querySelector("#searchForm");
  const searchInput = document.querySelector("#searchInput");

  searchForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = searchInput.value.trim();
    if (!query) return;

    const currentCategory = getParam("category") || "tents";

    window.location.href = `/product-list/index.html?category=${encodeURIComponent(currentCategory)}&search=${encodeURIComponent(query)}`;
  });
}

init();