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
  }
}

// find a product by id
export function findProductById(id, category = "tents") {
  const products = getData(category);
  return products.find((item) => String(item.Id) === String(id));
}