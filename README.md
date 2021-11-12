# Manchester United Quiz

Built with [Svelte](https://svelte.dev) and [manunited.io], using [urql] to handle GraphQL requests.

## Getting Started

> Caveat: You need to have registered with [manunited.io] to gain access to the API and the relevant Authorisation details.

1. Clone down the repo
2. Install the dependencies via `npm i` or `yarn`
3. Create an `.env` file containing the relevant auth details for the API (see Environment Variables)
4. Run `npm run dev` to get the site running in hot-reloading dev mode
5. Run `npm run build` to build the site in prod mode (and `npm start` to run it)

## Environment Variables

You'll need to create an `.env` file containing the following necessary auth details:

```
CLIENT_ID=[insert client id]
CLIENT_SECRET=[insert client secret]
MANUTD_TOKEN_URL=https://manutd.auth.eu-west-2.amazoncognito.com/token
MANUTD_API_URL=https://api.manunited.io/
```

[manunited.io]: https://docs.manunited.io
[urql]: https://formidable.com/open-source/urql/
