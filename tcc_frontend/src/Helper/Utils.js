import axios from "axios";

// get and post API

export async function getApi(endpoint, parameters = {}) {
  const url = "http://localhost:3000/api/" + endpoint;
  let params = {};
  params.params = parameters;

  try {
    const res = await axios.get(url, params);
    return res.data;
  } catch (e) {
    console.log("[getApi error]");
    console.log("url: " + url);
    console.log("params: " + JSON.stringify(params));
    console.log(e);
  }
}

export async function getProducts(prodType, parameters = {}) {
  const url = `http://localhost:3000/api/getProducts?shop=${prodType}`;
  let params = {};
  params.params = parameters;

  try {
    const res = await axios.get(url, params);
    return res.data;
  } catch (e) {
    console.log("[getApi error]");
    console.log("url: " + url);
    console.log("params: " + JSON.stringify(params));
    console.log(e);
  }
}

export async function postApi(endpoint, parameters = {}) {
  const url = "http://localhost:3000/api/" + endpoint;
  try {
    const res = await axios.post(url, parameters);
    return res.data;
  } catch (e) {
    console.log("[postApi error]");
    console.log("url: " + url);
    console.log("params: " + parameters);
    console.log(e);
  }
}
