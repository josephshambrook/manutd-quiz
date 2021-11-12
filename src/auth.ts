import { makeOperation } from "@urql/core";
import type { AuthTokenResponse } from "./types";

const STORAGE_KEY_TOKEN = "access-token";
const STORAGE_TOKEN_EXPIRES = "expires-in";

const calculateExpiryTime = (expirySeconds) =>
  Date.now() + expirySeconds * 1000;

export const getAuth = async ({ authState }) => {
  console.log("getAuth: authState", authState);

  if (!authState) {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);
    const expires = localStorage.getItem(STORAGE_TOKEN_EXPIRES);

    if (token && expires) {
      return { token, expires };
    }

    // commented out as authState is always null anyway, somehow
    // return null;
  }

  // attempt to get a new token now
  const requestTokenRawResponse = await fetch(
    `${process.env.MANUTD_TOKEN_URL}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const requestTokenResponse = await requestTokenRawResponse.json();

  // if a new token is available, store and use it
  if (requestTokenResponse?.access_token) {
    const { access_token, expires_in } = requestTokenResponse;

    const expiryTime = calculateExpiryTime(expires_in);

    localStorage.setItem(STORAGE_KEY_TOKEN, access_token);
    localStorage.setItem(STORAGE_TOKEN_EXPIRES, JSON.stringify(expiryTime));

    return {
      token: access_token,
      expires: expiryTime,
    };
  }

  // all else has failed, so stop everything
  localStorage.clear();
  return null;
};

export const addAuthToOperation = ({ authState, operation }) => {
  console.log("addAuthToOperation: authState", authState);

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
        Authorization: `Bearer ${authState.token}`,
      },
    },
  });
};

export const willAuthError = ({ authState }): boolean => {
  // check if the token has expired,
  // using the time set when retrieving the token
  console.log("checking if auth will error");
  console.log("willAuthError: authState", authState);

  if (!authState) return true;

  const now = Date.now();
  const expiry = parseInt(authState.expires, 10);
  return now < expiry;
};

export const didAuthError = ({ error }) => {
  // check if the error was an auth error
  // if it is, then we can automatically trigger requesting a new token
  console.log("checking if auth did error");
  console.log("didAuthError: error", error);

  const isAuthError = error.graphQLErrors.some(
    (e) => e.extensions?.code === "UNAUTHENTICATED"
  );

  console.log("isAuthError", isAuthError);

  return isAuthError;
};
