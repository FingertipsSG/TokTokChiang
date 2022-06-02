import axios from "axios";
const baseurl = "https://tok-tok-chiang-nodejs.herokuapp.com/";

export async function getProducts(prodType, parameters = {}) {
  const url = baseurl + `getProducts?shop=${prodType}`;
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

// Get products - lazy load
// Get products - lazy load
export async function getProductsLazyLoad(startRow, endRow, parameters) {
  const url = baseurl + "getProductsLL";
  try {
    const res = await axios({
      method: "POST",
      url: url,
      data: JSON.stringify({
        startRow: startRow,
        endRow: endRow,
      }),

      params: parameters,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log("[getApi error]");
    // console.log("url: " + url);
    // console.log(e);
    return e.response;
  }
}

// Same as getApi but returns res instead of res.data
// To return res.status 404 in the case where there are no data to be returned
export async function _getApi(endpoint, parameters = {}) {
  const url = baseurl + endpoint;
  let params = {};
  params.params = parameters;
  try {
    const res = await axios.get(url, params);
    return res;
  } catch (e) {
    console.log("[getApi error]");
    // console.log("url: " + url);
    // console.log("params: " + JSON.stringify(params));
    // console.log(e);
    return e.response;
  }
}

// GET
export async function getApi(endpoint, parameters = {}) {
  const url = baseurl + endpoint;
  let params = {};
  params.params = parameters;
  try {
    const res = await axios.get(url, params);
    // console.log(res);
    if (endpoint === "downloadProductCSV") {
      return res;
    }
    return res.data;
  } catch (e) {
    console.log("[getApi error]");
    console.log("url: " + url);
    console.log("params: " + JSON.stringify(params));
    console.log(e);
    return e;
  }
}

// POST
export async function postApi(endpoint, parameters = {}) {
  const url = baseurl + endpoint;
  try {
    const res = await axios.post(url, parameters);
    return res;
  } catch (e) {
    console.log("[postApi error]");
    console.log("url: " + url);
    console.log("params: " + parameters);
    console.log(e);
  }
}

export async function postFormApi(endpoint, parameters = {}) {
  const url = baseurl + endpoint;
  try {
    const formData = new FormData();

    formData.append("pName", parameters.pName);
    formData.append("pDesc", parameters.pDesc);
    formData.append("pPrice", parameters.pPrice);
    formData.append("pImage", parameters.pImage);
    formData.append("pUrl", parameters.pUrl);
    formData.append("shop", parameters.shop);

    // for (let key of formData.entries()) {
    //   console.log(key[0], key[1]);
    // }

    // console.log(formData.entries());

    const res = await axios({
      method: "POST",
      url: url,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });

    return res;
  } catch (e) {
    console.log("[postApi error]");
    console.log("url: " + url);
    console.log("params: " + parameters);
    console.log(e);
  }
}

// PATCH
export async function patchApi(endpoint, parameters = {}) {
  const url = baseurl + endpoint;
  try {
    const res = await axios.patch(url, parameters);
    return res.data;
  } catch (e) {
    console.log("[patchApi error]");
    console.log("url: " + url);
    console.log("params: " + parameters);
    console.log(e);
  }
}

export async function editFormApi(endpoint, parameters = {}) {
  const url = baseurl + endpoint;
  try {
    const formData = new FormData();

    // console.log(parameters)
    formData.append("pName", parameters.pName);
    formData.append("pDesc", parameters.pDesc);
    formData.append("pPrice", parameters.pPrice);
    formData.append("pImage", parameters.pImage);
    formData.append("pUrl", parameters.pUrl);
    formData.append("shop", parameters.shop);
    formData.append("id", parameters.id);

    // for (let key of formData.entries()) {
    //   console.log(key[0], key[1]);
    // }

    // console.log(formData.entries());

    const res = await axios({
      method: "PATCH",
      url: url,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });

    return res;
  } catch (e) {
    console.log("[patchApi error]");
    console.log("url: " + url);
    console.log("params: " + parameters);
    console.log(e);
  }
}

// PUT
export async function putApi(endpoint, parameters = {}) {
  const url = baseurl + endpoint;
  try {
    const res = await axios.put(url, parameters);
    return res;
  } catch (e) {
    console.log("[putApi error]");
    console.log("url: " + url);
    console.log("params: " + parameters);
    console.log(e);
  }
}

// DELETE
export async function deleteApi(endpoint, parameters = {}) {
  const url = baseurl + endpoint;
  try {
    // console.log(parameters);
    const res = await axios.delete(url, { data: parameters });
    return res;
  } catch (e) {
    console.log("[deleteApi error]");
    console.log("url: " + url);
    console.log("params: " + parameters);
    console.log(e);
  }
}
