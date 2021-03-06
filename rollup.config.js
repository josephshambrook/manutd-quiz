import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import { config as configDotenv } from "dotenv";

const production = !process.env.ROLLUP_WATCH;
const settings =
  process.env.SETTINGS || production ? "production" : "development";

configDotenv();

console.log("process.env", process.env);

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.ts",
  output: {
    sourcemap: !production,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    // Replace all environment variables manually
    replace({
      "process.env.NODE_ENV": production
        ? JSON.stringify("production")
        : JSON.stringify("development"),
      "__muq.env.NODE_ENV": production
        ? JSON.stringify("production")
        : JSON.stringify("development"),
      "__muq.env.CLIENT_ID": JSON.stringify(process.env.CLIENT_ID),
      "__muq.env.CLIENT_SECRET": JSON.stringify(process.env.CLIENT_SECRET),
      "__muq.env.MANUTD_TOKEN_URL": JSON.stringify(
        process.env.MANUTD_TOKEN_URL
      ),
      "__muq.env.MANUTD_API_URL": JSON.stringify(process.env.MANUTD_API_URL),
      "__muq.env.SETTINGS": JSON.stringify(settings),

      // replace options
      preventAssignment: true,
    }),

    // Svelte + Rollup compiler options
    svelte({
      preprocess: sveltePreprocess({
        sourceMap: !production,
      }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),

    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: "bundle.css" }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      inlineSources: !production,
      rootDir: "./src",
      resolveJsonModule: true,
    }),
    json(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
