import { ethers } from 'ethers'
import type { ProviderInstance } from '../types/types'

export function defineProvider(endpoint?: string): ProviderInstance | undefined {
  try {
    let provider
    if (endpoint)
      provider = new ethers.JsonRpcProvider(endpoint)
    else
      provider = new ethers.BrowserProvider(window.ethereum)

    return provider
  }
  catch (error) {
    console.error(error)
  }
}

