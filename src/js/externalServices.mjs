//Environmental Variable for the API
const baseURL = import.meta.env.VITE_SERVER_URL;

//Convert server response into JSON and help to catch errors if the server sends bad data
async function convertToJson(res) {
  const text = await res.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error("Invalid JSON response:", text);

    throw {
      name: "servicesError",
      message: "Server did not return valid JSON"
    };
  }

  // If the response is good, return the data
  if (res.ok) {
    return data;
  } else {
    // If something went wrong, throw an error
    throw {
      name: "servicesError",
      message: data
    };
  }
}

//SEARCH BAR
//Gets products from only one category. tents, backpacks, sleeping-bags, etc.
export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

//This new function gets products from ALL categories
//We need this for the search bar, because the user wants to search by product, not only categories
export async function getAllProducts() {
  //These are the categories in the project. Update names here if new ones are added
  const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];

  //Promise.all lets us call all categories at the same time
  const results = await Promise.all(
    categories.map(async (category) => {
      const response = await fetch(baseURL + `products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result;
    })
  );

  // results is an array of arrays
  // flat() turns it into one single array with all products
  return results.flat();
}


//Gets single product by id. Used for product details page
export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}



//Sends the checkout data to the server. Payload is the object with the order info
export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}