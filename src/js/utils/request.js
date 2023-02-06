// @flow
import { API_ROOT } from "../app/constants/config";
import { DeactivateAccount } from "./utils";

function sanitizeUrl(url: string) {
  const urlParts = url.split("?");

  if (!urlParts[0].endsWith("/")) {
    urlParts[0] += "/";
  }
  return urlParts.join("?");
}

export default function request(isNotifications, url, currentUser, options) {
  if (isNotifications) return irisRequest(url, options);
  else {
    const config = {
      method: "GET",
      ...options,
    };
    const errors = [];

    if (!url) {
      errors.push("url");
    }
    if (
      !config.payload &&
      config.method !== "GET" &&
      config.method !== "DELETE"
    ) {
      errors.push("payload");
    }

    if (errors.length) {
      throw new Error(`Error! You must pass \`${errors.join("`, `")}\``);
    }
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "active-user-email": currentUser,
      ...config.headers,
    };

    const params: Object = {
      headers,
      method: config.method,
      credentials: "include",
    };

    if (params.method !== "GET") {
      params.body = JSON.stringify(config.payload);
    }

    return fetch(`${API_ROOT}${sanitizeUrl(url)}`, params).then(
      async (response) => {
        let responseData;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          responseData = await response.json();
        } else {
          responseData = await response.text();
        }
        if (responseData.status === 401 || responseData.status === 403) {
          DeactivateAccount(currentUser);
        }
        return responseData;
      }
    );
  }
}
