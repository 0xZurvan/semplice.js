import { BrowserProvider } from 'ethers'
import type { JsonRpcSigner } from 'ethers'

interface ConnectedWallet {
  address: string
  signer: JsonRpcSigner
}

export async function connectWallet(): Promise<ConnectedWallet | undefined> {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const address = await signer.getAddress()

    return { signer, address }
  }
  catch (error) {
    console.error('Error connecting to MetaMask:', error)
    return undefined
  }
}

export function formatAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`
}
