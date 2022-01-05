/// <reference types="svelte" />

interface Muq {
  env: {
    NODE_ENV: "development" | "production";
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    MANUTD_TOKEN_URL: string;
    SETTINGS: "development" | "staging" | "production";
  };
}

declare var __muq: Muq;
