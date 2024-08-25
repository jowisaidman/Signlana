import { atom } from 'nanostores'

export const $currentWallet = atom({
    wallet: "",
    chain: ""
})

export const $transactionData = atom({
  amount: 0,
  currency: "",
  from: "",
  transactionId: ""
})

export function setCurrentWallet(wallet, chain) {
  $currentWallet.set({wallet,chain});
}

export function setTransactionData(amount, currency, from) {
  $transactionData.set({amount, currency, from});
}

export function setTransactionId(transactionId) {
  $transactionData.set({transactionId});
}