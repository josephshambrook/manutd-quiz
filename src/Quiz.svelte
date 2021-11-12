<script lang="ts">
  import { onMount } from "svelte";
  import { initClient } from "@urql/svelte";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";

  initClient({
    url: "http://localhost:3000/graphql",
  });

  const STORAGE_KEY = "theme";
  const DARK_PREFERENCE = "(prefers-color-scheme: dark)";

  const THEMES = {
    DARK: "dark",
    LIGHT: "light",
  };

  let currentTheme: string;

  const prefersDarkThemes = () => window.matchMedia(DARK_PREFERENCE).matches;

  const applyTheme = () => {
    const preferredTheme = prefersDarkThemes() ? THEMES.DARK : THEMES.LIGHT;
    currentTheme = localStorage.getItem(STORAGE_KEY) ?? preferredTheme;

    currentTheme = localStorage.getItem(STORAGE_KEY) ?? preferredTheme;

    if (currentTheme === THEMES.DARK) {
      document.body.classList.remove(THEMES.LIGHT);
      document.body.classList.add(THEMES.DARK);
    } else {
      document.body.classList.remove(THEMES.DARK);
      document.body.classList.add(THEMES.LIGHT);
    }
  };

  const toggleTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      // clear storage
      localStorage.removeItem(STORAGE_KEY);
    } else {
      // store opposite of preference
      localStorage.setItem(
        STORAGE_KEY,
        prefersDarkThemes() ? THEMES.LIGHT : THEMES.DARK
      );
    }

    applyTheme();
  };

  onMount(() => {
    applyTheme();
    window.matchMedia(DARK_PREFERENCE).addEventListener("change", applyTheme);
  });
</script>

<style>
  :root {
    /* #DA291C */
    --color-red: hsla(4, 77%, 48%, 1);
    /* #FBE122 */
    --color-yellow: hsla(53, 96%, 56%, 1);
  }

  :global(body) {
    --theme-primary: var(--color-red);
    --theme-secondary: var(--color-yellow);

    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }

  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<Header />

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>

<Footer />
