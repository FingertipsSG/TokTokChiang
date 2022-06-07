import axios from "axios";
var baseUrl = process.env.BASEURL || "https://tok-tok-chiang-nodejs.herokuapp.com";

export async function getProducts(catid, parameters = {}) {
  const url = baseUrl + `/getProducts?categoryId=${catid}`;
  let params = {};
  params.params = parameters;

  try {
    const res = await axios.get(url, params);
    return res.data;
  } catch (e) {
    console.log("[getApi error]");
    // console.log("url: " + url);
    // console.log("params: " + JSON.stringify(params));
    // console.log(e);
  }
}

// Get products - lazy load
export async function getProductsLazyLoad(startRow, endRow, parameters) {
  const url = baseUrl + "/getProductsLL";
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
  const url = baseUrl + "/" + endpoint;
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
  const url = baseUrl + "/" + endpoint;
  let params = {};
  params.params = parameters;
  try {
    const res = await axios({
      method: "GET",
      url: url,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    // console.log(res);
    if (endpoint === "downloadProductCSV") {
      return res;
    }
    return res.data;
  } catch (e) {
    console.log("[getApi error]");
    // console.log("url: " + url);
    // console.log("params: " + JSON.stringify(params));
    // console.log(e);
    return e;
  }
}

// POST - with JWT token
export async function postApi(endpoint, parameters = {}) {
  const url = baseUrl + "/" + endpoint;
  try {
    const res = await axios({
      method: "POST",
      url: url,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: parameters,
    });
    return res;
  } catch (e) {
    console.log("[postApi error]");
    // console.log("url: " + url);
    // console.log("params: " + parameters);
    // console.log(e);
  }
}

// POSTIMAGEAPI - with JWT token
export async function postImageApi(endpoint, parameters = {}) {
  const url = baseUrl + "/" + endpoint;
  try {
    const formData = new FormData();

    console.log(parameters);
    formData.append("image", parameters.image);
    formData.append("productid", parameters.productid);
    formData.append("identityid", parameters.identityid);

    // for (let key of formData.entries()) {
    //   console.log(key[0], key[1]);
    // }

    // console.log(formData.entries());

    const res = await axios({
      method: "POST",
      url: url,
      data: formData,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (e) {
    console.log("[postImageApi error]");
    // console.log("url: " + url);
    // console.log("params: " + parameters);
    // console.log(e);
    return e.response;
  }
}

// POST downloadCSV - with JWT token
export async function postDownloadCSVApi(endpoint, parameters = {}) {
  const url = baseUrl + "/" + endpoint;
  const headers = {
    ...parameters.headers,
    authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
  };
  const dataBody = parameters.params;

  try {
    const res = await axios({
      method: "POST",
      url: url,
      headers: headers,
      data: dataBody,
    });
    return res;
  } catch (e) {
    console.log("[postApi error]");
    // console.log("url: " + url);
    // console.log("params: " + parameters);
    // console.log(e);
  }
}

// PATCH
export async function patchApi(endpoint, parameters = {}) {
  const url = baseUrl + "/" + endpoint;
  try {
    const res = await axios({
      method: "PATCH",
      url: url,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: parameters,
    });
    return res;
  } catch (e) {
    console.log("[patchApi error]");
    // console.log("url: " + url);
    // console.log("params: " + parameters);
    // console.log(e);
  }
}

export async function editImageApi(endpoint, parameters = {}) {
  const url = baseUrl + "/" + endpoint;
  try {
    const formData = new FormData();

    console.log(parameters);
    formData.append("image", parameters.image);
    formData.append("productid", parameters.productid);
    formData.append("imageid", parameters.imageid);
    formData.append("identityid", parameters.identityid);

    for (let key of formData.entries()) {
      console.log(key[0], key[1]);
    }

    console.log(formData.entries());

    const res = await axios({
      method: "PATCH",
      url: url,
      data: formData,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (e) {
    console.log("[patchImageApi error]");
    // console.log("url: " + url);
    // console.log("params: " + parameters);
    // console.log(e);
    return e.response;
  }
}

// PUT
export async function putApi(endpoint, parameters = {}) {
  const url = baseUrl + "/" + endpoint;
  try {
    // LEFTOFFAT
    console.log(localStorage.getItem("token"));

    const res = await axios({
      method: "PUT",
      url: url,
      data: parameters,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
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
  const url = baseUrl +  "/" + endpoint;
  try {
    // console.log(parameters);
    const res = await axios({
      method: "DELETE",
      url: url,
      data: parameters,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    return res;
  } catch (e) {
    console.log("[deleteApi error]");
    // console.log("url: " + url);
    // console.log("params: " + parameters);
    // console.log(e);
    return e.response;
  }
}
