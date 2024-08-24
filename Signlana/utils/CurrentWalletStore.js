import { atom } from 'nanostores'

export const $currentWallet = atom({
    wallet: "",
    chain: ""
})

export function setCurrentWallet(wallet, chain) {
  $currentWallet.set({wallet,chain});
}