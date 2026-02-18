//convert response to json
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

//get the list of products
export function getData(category = "tents") {
  return fetch(`/json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

//find a product by id
export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => String(item.Id) === String(id));
}
