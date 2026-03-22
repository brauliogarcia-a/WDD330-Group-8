import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrderTotal.bind(checkoutProcess)
  );

// Form Validation
document.querySelector("#checkoutSubmit")
  .addEventListener("click", (e) => {
    e.preventDefault();
    const myForm = document.querySelector("form[name='checkout']");
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if(chk_status) 
      checkoutProcess.checkout(myForm);
  });