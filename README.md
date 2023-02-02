# Staking demo for Unique Network

This is a demo of staking on Unique Network.  
It is a simple script that shows how to get staked balance, stake and unstake (unstaking is under construction) tokens on Unique Network.

The core idea is the script `index.ts` being compiled to `dist/index.js` in IIFE mode and then being served by a simple server via the `index.html`.

The `index.html` file is a simple html page that loads the `dist/index.js` just for a demonstration purposes, the real output is the `dist/index.js` file **only**.

### Prerequisites
node@16+
yarn@1.22+

### Installation

```bash
yarn
```

### Build

```bash
yarn build
```

Then the file `dist/index.js` will be created and can be simply copied to any static server and served with a `<script src="index.js"/>` tag.

The file `metafile-iife.json` is also created and can be used to get the list of all the dependencies of the `dist/index.js` file. To view the list of dependencies please use the [Bundle Buddy](https://www.bundle-buddy.com/).

### Run in dev mode

Two terminals are required to run the demo in dev mode:

#### First terminal

```bash
yarn dev
```

This will run [tsup](https://tsup.egoist.dev/) (esbuild wrapper) in watch mode.   
Any changes in the `index.ts` file will be automatically compiled to the `dist/index.js` file.  
But there will not be any Hot Module Replacement (HMR) for the `index.html` file so the page will need to be reloaded manually.


#### Second terminal

```bash
yarn serve
```

This will run server on localhost:3001 which will just statically serve the index.html file.
