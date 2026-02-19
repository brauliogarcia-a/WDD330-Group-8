let cartTimeout;

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get a parameter from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// render a list with a template 
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

// update cart count
export function updateCartCount() {
  const cartItems = getLocalStorage('so-cart') || [];
  const cartCountElement = document.getElementById('cart-count');
  const cartIcon = document.querySelector('.cart svg');

  if (cartCountElement) {
    const itemCount = cartItems.reduce((total, item) => total + item.Quantity, 0);
    cartCountElement.textContent = itemCount;
    

    if (cartIcon) {
      clearTimeout(cartTimeout);

      if (itemCount > 0) {
        cartIcon.classList.remove('animate-cart');
        void cartIcon.offsetWidth; 
        cartIcon.classList.add('animate-cart');

        cartTimeout = setTimeout(() => {
          cartIcon.classList.remove('animate-cart');
        }, 30000);
      } else {
        cartIcon.classList.remove('animate-cart');
      }
    }
  }
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  let htmlString = await templateFn(data); 
  parentElement.insertAdjacentHTML(position, htmlString);

  if(callback) {
    callback(data);
  }
}

// load header and footer
export async function loadHeaderFooter() {
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");

  if (headerEl) {
    const res = await fetch("/partials/header.html");
    headerEl.innerHTML = await res.text();
  }

  if (footerEl) {
    const res = await fetch("/partials/footer.html");
    footerEl.innerHTML = await res.text();
  }

  updateCartCount();
}