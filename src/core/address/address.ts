import { JsonRpcProvider } from 'ethers'
import type { JsonRpcSigner } from 'ethers'

export function formatAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`
}

export async function connectWallet() {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/ckN344g49RcvfHyjzwu3QUPKl71HDLnk')
    const signer = await provider.getSigner()
    const address = await signer.getAddress()
    return { provider, signer, address }
  }
  catch (error) {
    console.error('Error connecting to MetaMask')
  }
  return null
}

export function setupWallet(element: HTMLButtonElement) {
  let walletInfo: { provider: JsonRpcProvider, signer: JsonRpcSigner, address: string } | null = null

  const updateDisplay = () => {
    if (walletInfo)
      element.innerHTML = `Connected: ${walletInfo.address}`

    else
      element.innerHTML = 'Wallet not connected'
  }

  element.addEventListener('click', async () => {
    walletInfo = await connectWallet()
    updateDisplay()
  })

  updateDisplay()
}
