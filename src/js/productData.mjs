const baseURL = import.meta.env.VITE_SERVER_URL

//convert response to json
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// get the list of products
export async function getData(category = "tents") {
  const response = await fetch(`${baseURL}/products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

// find a product by id
export async function findProductById(id, category) {
  // Usamos el endpoint de producto individual '/product/' que es el estándar de la API
  // Aseguramos que haya una '/' entre baseURL y el endpoint
  const response = await fetch(`${baseURL}/product/${id}`);

  const product = await convertToJson(response);
  console.log("Producto encontrado:", product);
  return product.Result;
}