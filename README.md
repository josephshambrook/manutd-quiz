# Manchester United Quiz

A "Top 10" quiz all about Manchester United statistics. Built with [Svelte] and [manunited.io].

## Tech

- [Svelte] - a really nifty JavaScript framework
- [manunited.io] - a GraphQL API built by [Matt Adams]
- [urql] - a GraphQL client with Svelte bindings
- [MSW] - Mock Service Worker, for mocking network requests locally in an unobtrusive way
- [Simple CSS] - A classless CSS framework that makes getting started with decent styling easy-peasy

## Running locally

> Caveat: You need to have registered with [manunited.io] to gain access to the API and the relevant Authorisation details.

1. Clone down the repo
2. Install the dependencies via `npm i` or `yarn`
3. Create an `.env` file containing the relevant auth details for the API (see Environment Variables)
4. Run `npm run dev` to get the site running in hot-reloading dev mode
5. Run `npm run build` to build the site in prod mode (and `npm start` to run it)

### Environment variables

You'll need to create an `.env` file containing the following necessary auth details:

```
CLIENT_ID=[insert client id]
CLIENT_SECRET=[insert client secret]
MANUTD_TOKEN_URL=https://manutd.auth.eu-west-2.amazoncognito.com/token
MANUTD_API_URL=https://api.manunited.io/
```

## Question topics

### Currently added to web app

- Player statistics
  - Top goalscorers of all time

### Future questions for web app supported by API

- Player statistics
  - Most yellow cards of all time
  - Most red cards of all time
- Team statistics
  - Seasons with most goals
  - Cup winning seasons
    - By individual cup (e.g. FA Cup)
- Manager statistics
  - Most wins in individual competition

### Future but currently unattainable questions

The following is a non-exhaustive list of questions we've thought to add, but the API in it's current form either makes these too difficult to implement, or are not supported at all.

- Player statistics
  - Top goalscorers in a given competition (e.g. FA Cup)
  - Most yellow carded players in a given season
  - Most yellow carded players in a given competition
  - Most red carded players in a given season
  - Most red carded players in a given competition

[svelte]: https://svelte.dev
[manunited.io]: https://docs.manunited.io
[urql]: https://formidable.com/open-source/urql/
[msw]: https://mswjs.io/
[simple css]: https://simplecss.org/
[matt adams]: https://matt.scot/author/matt
