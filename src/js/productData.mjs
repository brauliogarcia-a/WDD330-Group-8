<<<<<<< HEAD
const baseURL = import.meta.env.VITE_SERVER_URL

//convert response to json
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
=======
import tents from "../json/tents.json";
import backpacks from "../json/backpacks.json";
import sleepingBags from "../json/sleeping-bags.json";

// get the list of products
export function getData(category = "tents") {
  switch (category) {
    case "tents":
      return tents;
    case "backpacks":
      return backpacks;
    case "sleeping-bags":
      return sleepingBags;
    default:
      return tents;
>>>>>>> 1684007871037573e226790f3076b4b9c25fcf2f
  }
}

// find a product by id
export function findProductById(id, category = "tents") {
  const products = getData(category);
  return products.find((item) => String(item.Id) === String(id));
}