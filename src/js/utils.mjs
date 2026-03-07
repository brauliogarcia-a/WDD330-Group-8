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
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCountElement = document.getElementById("cart-count");
  const cartIcon = document.querySelector(".cart svg");

  if (cartCountElement) {
    const itemCount = cartItems.reduce((total, item) => total + item.Quantity, 0);
    cartCountElement.textContent = itemCount;
    

    if (cartIcon) {
      clearTimeout(cartTimeout);

      if (itemCount > 0) {
        cartIcon.classList.remove("animate-cart");
        void cartIcon.offsetWidth; 
        cartIcon.classList.add("animate-cart");

        cartTimeout = setTimeout(() => {
          cartIcon.classList.remove("animate-cart");
        }, 30000);
      } else {
        cartIcon.classList.remove("animate-cart");
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
function loadTemplate(path) {
  // wait what?  we are returning a new function? this is called currying and can be very helpful.
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

// load header and footer
export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");
  await renderWithTemplate(headerTemplateFn, headerEl);
  await renderWithTemplate(footerTemplateFn, footerEl);
  updateCartCount();
}

// Alert message
export function alertMessage(message, scroll = true) {

  const alert = document.createElement("div");

  alert.classList.add("alert");

  alert.innerHTML = `
    <p>${message}</p>
    <span class="close">X</span>
  `;

  const main = document.querySelector("main");

  alert.addEventListener("click", function(e) {

    if (e.target.classList.contains("close")) {
      main.removeChild(this);
    }

  });

  main.prepend(alert);

  if (scroll) {
    window.scrollTo(0,0);
  }

}