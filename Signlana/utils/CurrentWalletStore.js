import { atom } from 'nanostores'

export const $currentWallet = atom({
    wallet: "",
    chain: ""
})

export const $transactionData = atom({
  amount: 0,
  currency: "",
  from: "",
  transactionId: "",
  chainId: ""
})

export function setCurrentWallet(wallet, chain) {
  $currentWallet.set({wallet,chain});
}

export function setTransactionData(amount, currency, from, chainId) {
  $transactionData.set({...$transactionData.get(), amount, currency, from, chainId});
}

export function setTransactionId(transactionId) {
  $transactionData.set({...$transactionData.get(), transactionId});
}