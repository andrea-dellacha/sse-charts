# Coding Challenge UpFluence


## About The App
Sse-charts is an app in response to [Upfluence's coding challenge](https://gist.github.com/AlexisMontagne/6964887537bba43ce8d2ed7dd7a4a85e)

It shows a dashboard with a 3-dimensional visualization of the social posts, the data comes from a publicly HTTP API endpoint stream using SSE technology.
You can filter the graphs displayed by social media.


### Technical choice

I choose to develop the app with Vue.js/Nuxt.js framework because it's the only frontend framework I know yet and it's powerfull one.
I used Vueuse modules as it's recommended by Nuxt.js and it provide a Collection of essential Vue Composition Utilities such as the SSE connection.

For the graphs I choose to use chart.js as it's a popular open source library, fast and easy to use.

For the design part, I tried to find some upfluence's colors and component design to fit the brand, as I'm not an UI designer it's a simple and sober design.


## Trade-offs

I spend around 6 hours on this project, including research and code. I had never coded graphics or used SSE stream before.
With additional time I could add functionnal tests, it's been a long time since I've done one so I preferred to leave it aside. If I can free up some time this week I might add some.

I could also spend more time searching better ideas for the design, or add a dark mode.


## Requirements

For development, you will only need Node.js installed on your environement. I used node.js version 20.0.0

    $ node --version
    v18.0.0 or <=21.0.0

### Setup

Make sure to install the dependencies:

I have an installation issue between pnpm and dayjs-nuxt, I didn't find how to fix it yet. If you want to use pnpm, first use yarn install.

```bash
# yarn
yarn install

# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev

# yarn
yarn dev

# npm
npm run dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm run build

# yarn
yarn build

# npm
npm run build
```

Locally preview production build:

```bash
# pnpm
pnpm run preview

# yarn
yarn preview

# npm
npm run preview
```
