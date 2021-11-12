import axios from "axios";
import { makeOperation } from "@urql/core";
import type { AuthTokenResponse } from "../types";

const STORAGE_KEY_TOKEN = "access-token";

export const getAuth = async ({ authState }) => {
  if (!authState) {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);

    if (token) {
      return token;
    }

    return null;
  }

  // attempt to get a new token now
  const requestTokenResponse = await axios(process.env.MANUTD_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: process.env.GRANT_TYPE,
    },
  });

  // if a new token is available, store and use it
  if (requestTokenResponse?.data?.access_token) {
    localStorage.setItem(
      STORAGE_KEY_TOKEN,
      requestTokenResponse.data.access_token
    );

    return requestTokenResponse.data;
  }

  // all else has failed, so stop everything
  localStorage.clear();
  return null;
};

export const addAuthToOperation = ({ authState, operation }) => {
  // the token isn't in the auth state, return the operation without changes
  if (!authState || !authState.token) {
    return operation;
  }

  // fetchOptions can be a function (See Client API) but you can simplify this based on usage
  const fetchOptions =
    typeof operation.context.fetchOptions === "function"
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: authState.token,
      },
    },
  });
};

export const willAuthError = ({ authState }): boolean => {
  console.log("checking if auth will error");
  console.log("authState", authState);

  const now = Date.now() / 1000;
  const expiry = authState.token.expires_in;
  return now < expiry;
};
