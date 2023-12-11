import { BrowserProvider } from 'ethers'
import type { ProviderInstance } from '../types/types'

export function defineProvider(): ProviderInstance {
  const provider = new BrowserProvider(window.ethereum)
  return provider
}
