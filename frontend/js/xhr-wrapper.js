let HttpResponse = function (xhr) {
  this.body = xhr.response;
  this.status = xhr.status;
  this.headers = xhr
    .getAllResponseHeaders()
    .split("\r\n")
    .reduce((result, current) => {
      let [name, value] = current.split(": ");
      result[name] = value;
      return result;
    }, {});
  this.parser = new DOMParser();
};

HttpResponse.prototype.json = function () {
  return JSON.parse(this.body);
};

HttpResponse.prototype.getAsDOM = function () {
  return this.parser.parseFromString(this.body, "text/html");
};

let HttpError = function (xhr) {
  this.body = xhr.response;
  this.status = xhr.status;
  this.headers = xhr
    .getAllResponseHeaders()
    .split("\r\n")
    .reduce((result, current) => {
      let [name, value] = current.split(": ");
      result[name] = value;
      return result;
    });
};

HttpError.prototype.toString = function () {
  let json = JSON.parse(this.body);
  return "[" + this.status + "] Error: " + json.error || json.errors.join(", ");
};

let httpRequest = function (method, url, { headers, body, options } = {}) {
  method = method.toUpperCase();

  let xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open(method, url, true);

  xhr.setRequestHeader("Content-Type", "application/json");
  for (const key in headers) {
    if (Object.hasOwnProperty.call(headers, key)) {
      xhr.setRequestHeader(key, headers[key]);
    }
  }

  if (options && options.hasOwnProperty("checkProgress")) {
    xhr.upload.onprogress = options.checkProgress;
  }
  xhr.send(body);

  return new Promise((resolve, reject) => {
    xhr.onload = function () {
      resolve(new HttpResponse(xhr));
    };

    xhr.onerror = function () {
      reject(new HttpError(xhr));
    };

    xhr.onabort = function () {
      reject(new HttpError(xhr));
    };
  });
};

export const axios = {
    get: (url, options) => httpRequest("get", url, options),
    post: (url, options) => httpRequest("post", url, options),
    put: (url, options) => httpRequest("put", url, options),
    delete: (url, options) => httpRequest("delete",url, options),
    patch: (url, options) => httpRequest("patch", url, options),
}
