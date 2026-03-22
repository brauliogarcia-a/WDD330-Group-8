import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {

  loadHeaderFooter();

  // CTA button
  document.querySelectorAll(".register-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Registration coming soon!");
    });
  });

  // Modal
  const modal = document.querySelector("#promoModal");
  const closeBtn = document.querySelector("#closeModal");

  if (modal && !localStorage.getItem("promoShown")) {
    modal.classList.remove("hidden");
    localStorage.setItem("promoShown", "true");
  }

  closeBtn?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Newsletter
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

});

// Search bar 
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

searchForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();

  if (!query) return;

  // redirigir con query param
  window.location.href = `/product-list/index.html?search=${query}`;
});