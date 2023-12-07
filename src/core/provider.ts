import { JsonRpcProvider } from 'ethers' 

export function defineProvider(endpoint: string) {
  const provider = new JsonRpcProvider(endpoint)
  return provider
}