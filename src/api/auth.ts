import axios from "axios";
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

  if (requestTokenResponse?.data?.access_token) {
    return requestTokenResponse.data.access_token;
  }

  return null;
};

export const willAuthError = (token: AuthTokenResponse): boolean => {
  const now = Date.now() / 1000;
  const expiry = token.expires_in;
  return now < expiry;
};
