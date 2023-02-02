import {Client, Sdk} from '@unique-nft/sdk'
import Extension from '@unique-nft/utils/extension'

const SDK_BASE_URLS = {
  quartz: 'https://rest.quartz.uniquenetwork.dev/v1',
  opal: 'https://rest.opal.uniquenetwork.dev/v1',
}

async function setStake(client: Client, address: string, amountInit: number) {
  const {decimals} = await client.common.chainProperties()

  const amount = (BigInt(amountInit * 10**9) * (10n**(BigInt(decimals - 9)))).toString()

  console.log(`You are going to stake ${amountInit} tokens or ${amount} wei`)

  const result = await client.extrinsics.submitWaitResult({
    address: address,
    section: 'appPromotion',
    method: 'stake',
    args: [amount.toString()],
  })

  return result
}

const getBalanceAndStake = async (amount: number) => {
  console.log('amount', amount)

  const enablingResult = await Extension.Polkadot.enableAndLoadAllWallets()
  if (!enablingResult.info.extensionFound) {
    throw new Error('Extension not found')
  } else if (!enablingResult.info.accountsFound) {
    throw new Error('No accounts found')
  } else if (enablingResult.info.userHasBlockedAllWallets) {
    throw new Error('All wallets are blocked')
  } else if (enablingResult.info.userHasWalletsButHasNoAccounts) {
    throw new Error('No accounts found. Please, create an account')
  }
  const accounts = enablingResult.accounts

  //todo: proper account selection
  const account = accounts[0]

  // create client
  const options = {
    baseUrl: SDK_BASE_URLS.opal,
    signer: account.uniqueSdkSigner,
  }
  const client = new Sdk(options)

  // весь застейченный баланс отображается в lockedBalance
  const initBalanceResponse = await client.balance.get({address: account.address})
  console.log(initBalanceResponse)
  console.log(`Address ${account.address} has staked ${initBalanceResponse.lockedBalance.formatted} ${initBalanceResponse.lockedBalance.unit}`)

  throw new Error('COMMENT OUT THE LINE TO CONTINUE')

  // set stake
  const setStakeResult = await setStake(client, account.address, amount)
  console.log(setStakeResult)

  if (setStakeResult.error) throw new Error(setStakeResult.error.toString())

  const value = await client.stateQuery.execute({
      endpoint: 'rpc',
      module: 'appPromotion',
      method: 'totalStaked',
    },
    {args: [{Substrate: account.address} as any]}
  )
  console.log(value)
}

const registerStakingForm = async () => {
  const $form = document.querySelector('form#staking-form')
  if (!$form) throw new Error('Form not found')

  $form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const $response = document.querySelector('#staking-response')
    if (!$response) throw new Error('Response DOM Node not found')

    try {
      const $amount = document.querySelector('#staking-amount') as HTMLInputElement | null
      if (!$amount) throw new Error('Amount not found')
      const amount = parseFloat($amount.value || '')
      if (isNaN(amount)) throw new Error('Amount is not a number')

      $response.textContent = `Staking...`

      await getBalanceAndStake(amount)

      $response.textContent = 'Output:\nstaked'

    } catch (e: any) {
      console.log(JSON.stringify(e))
      $response.textContent = `Error: ${(e && ('error' in e) ? e.error.message: e.message || e || 'unknown error')}`
    }
  })
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    registerStakingForm().catch(err => console.error(err))
  })
}
