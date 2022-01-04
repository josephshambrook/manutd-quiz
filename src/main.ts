import App from "./App.svelte";
import { worker } from "./mocks/browser";

if (process.env.USE_MOCKS === "true") {
  worker.start();
}

const app = new App({
  target: document.body,
});

export default app;
