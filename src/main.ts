import App from "./App.svelte";
import { worker } from "./mocks/browser";

if (__muq.env.SETTINGS === "development") {
  worker.start();
}

const app = new App({
  target: document.body,
});

export default app;
