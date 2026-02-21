import { getLocalStorage } from "./utils.mjs";
 
const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
 
  init(key, selector) {
    this.key = key;
    this.outputSelector = selector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
  },
 
  calculateItemSummary() {
    this.itemTotal = this.list.reduce((sum, item) => {
      return sum + item.FinalPrice * item.quantity;
    }, 0);
 
    this.displayTotals();
  },
 
  calculateOrderTotal() {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;
 
    this.displayTotals();
  },
 
  displayTotals() {
    
    const element = document.querySelector(this.outputSelector);
    element.innerHTML = `
<p>Subtotal: $${this.itemTotal.toFixed(2)}</p>
<p>Shipping: $${this.shipping.toFixed(2)}</p>
<p>Tax: $${this.tax.toFixed(2)}</p>
<h3>Total: $${this.orderTotal.toFixed(2)}</h3>
    `;
  }
};
 
export default checkoutProcess;