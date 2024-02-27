Made with Love by [Movton](https://twitter.com/putaindmouton).

This is a template for a Dapp using [Next.js](https://nextjs.org/), [Ethers.js](https://docs.ethers.io/v5/) and [RainbowKit](https://www.rainbowkit.com/docs/introduction).

[Next.js 13](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, use Degit to clone the repo. Then, run the development server:

```bash

# install degit if you don't have it
npm install -g degit

# clone the repo
npx degit Movton/Dapp-Template app-name

# install dependencies
cd app-name
npm install

npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Fonts.
In order to respect RGPD, download the fonts you want to use and put them in `public/fonts`. You can then declare them in `app/layout.js`.

## Learn More

You can Find Some Useful Hooks that you can use to easily interact with the blockchain in `app/Hooks`.
You can see some examples of the Hooks in `app/hook/page.js`.

Some prebuilt components are available in `app/Components`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

You can find a deployed version of this template [here](https://dapp-template-lilac.vercel.app/).
