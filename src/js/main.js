//Import
import { loadHeaderFooter } from "./utils.mjs";

//DOM Content loader
document.addEventListener("DOMContentLoaded", async () => {
  //Load header and footer
  await loadHeaderFooter();

  //Search bar 
  const searchForm = document.querySelector("#searchForm");
  const searchInput = document.querySelector("#searchInput");

  //Add the submit event only if the form and input exist
  searchForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    //Get the text user provided
    const query = searchInput?.value.trim();
   
    //If the input is empty, stop here
    if (!query) return;

    //Send the user to the product list page with the search word
    window.location.href = `/product-list/index.html?search=${encodeURIComponent(query)}`;
  });

  //CTA button
  document.querySelectorAll(".register-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Registration coming soon!");
    });
  });

  //Modal
  const modal = document.querySelector("#promoModal");
  const closeBtn = document.querySelector("#closeModal");

  if (modal && !localStorage.getItem("promoShown")) {
    modal.classList.remove("hidden");
    localStorage.setItem("promoShown", "true");
  }
  //Close the modal
  closeBtn?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  //Newsletter
  const button = document.querySelector("#subscribeBtn");
  const input = document.querySelector("#emailInput");
  const message = document.querySelector(".success-message");

  button?.addEventListener("click", () => {
    if (!input.value) {
     alert("Please enter a valid email");
     return;
    }

    message.classList.add("show");
    input.value = "";
   });

}); //End of DOM content loader

