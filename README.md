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

Then the file `dist/index.global.js` will be created and can be simply copied to any static server and served with a `<script src="index.global.js"/>` tag.

The file `metafile-iife.json` is also created and can be used to get the list of all the dependencies of the `dist/index.js` file. To view the list of dependencies please use the [Bundle Buddy](https://www.bundle-buddy.com/).

Include the `index.global.js` file to add the `UniqueStaking` global variable.

## The `UniqueStaking` module contains the following functions

### `getAccountList`

#### Overview

Getting a list of accounts registered in the Polkadot wallet

#### Arguments

none

#### Returns

An array of `IPolkadotExtensionAccount` objects. `IPolkadotExtensionAccount` object includes `id`, `name` and other fields.

#### Brief example

```
const list = await UniqueStaking.getAccountList()
```

### `getAccountById`

#### Overview

Getting an account object by account id

#### Arguments

`accountId: string` - account id

`receivedAccounts: IPolkadotExtensionAccount[]` (optional) - list of accounts

#### Returns

Object instance `IPolkadotExtensionAccount`

#### Brief example

```
const account = await UniqueStaking.getAccountById('polkadot-js/5CDBpcN5jAYiHtUoMmb2PhUE8WVG7xPYcbBWZuAd2MkMXgoC')
```

### `initSDK`

#### Overview

Initializing the `@unique-nft/sdk` instance

#### Arguments

`chainNameOrUrl: string` - network name to connect sdk from predefined (`opal`, `quartz`) or the path to network 

#### Returns

Returns an instance of the `@unique-nft/sdk` library of type `Client`

#### Brief example

```
const account = UniqueStaking.initSDK('quartz')
```

### `totalStaked`

#### Overview

Returns the total amount of staked tokens

#### Arguments

`accountOrAccountIdOrAddress: IPolkadotExtensionAccount | string` - account object or account id or a Substrate address

`sdkInstanceOrChainNameOrUrl: Client | string` - an instance of the `@unique-nft/sdk` library or network name or the path to network

#### Returns

A `number` containing the total amount of staked tokens

#### Brief example

```
const account = await UniqueStaking.totalStaked('5CDBpcN5jAYiHtUoMmb2PhUE8WVG7xPYcbBWZuAd2MkMXgoC', 'quartz')
```

### `amountCanBeStaked`

#### Overview

The amount of tokens available for staking

#### Arguments

`totalStaked` function arguments

#### Returns

A `number` containing the amount of tokens available for staking

#### Brief example

```
const account = await UniqueStaking.amountCanBeStaked('5CDBpcN5jAYiHtUoMmb2PhUE8WVG7xPYcbBWZuAd2MkMXgoC', 'quartz')
```

### `stake`

#### Overview

Stakes the amount of native tokens

#### Arguments

`totalStaked` function arguments

`initAmount: number | string` - amount of tokens to stake. Minimum stake amount is 100

#### Returns

An object of type `{ success: boolean; error?: object }` will be returned. In case of successful execution of the function, the `success` parameter will be equal to `true`. In case of unsuccessful execution of the function, the error will be in the `error` field

Brief example

```
const account = await UniqueStaking.stake('5CDBpcN5jAYiHtUoMmb2PhUE8WVG7xPYcbBWZuAd2MkMXgoC', 'quartz', 100)
```

### `unstake`

#### Overview

Stakes the amount of native tokens

#### Arguments

`totalStaked` function output

#### Returns

`stake` function returns

#### Brief example

```
const account = await UniqueStaking.unstake('5CDBpcN5jAYiHtUoMmb2PhUE8WVG7xPYcbBWZuAd2MkMXgoC', 'quartz')
```

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
