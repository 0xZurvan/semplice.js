import { BrowserProvider, JsonRpcProvider } from 'ethers'
import type { ProviderInstance } from '../types/types'

export function defineProvider(endpoint?: string): ProviderInstance {
  let provider
  if (endpoint)
    provider = new JsonRpcProvider(endpoint)
  else
    provider = new BrowserProvider(window.ethereum)

  return provider
}

