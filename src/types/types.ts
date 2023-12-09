import type { BrowserProvider, JsonRpcProvider } from 'ethers'

export type ProviderInstance = BrowserProvider | JsonRpcProvider

export interface ContractInstance {
  abi: ContractABI[]
  address: string
  provider?: ProviderInstance | undefined
  type?: 'query' | 'call'
}

export interface Function<T extends unknown[] = unknown[], U = any> {
  (...args: T): Promise<U>
}

export type MethodsRecord<T extends Record<string, Function>> = {
  [K in keyof T]: Function<Parameters<T[K]>, ReturnType<T[K]>>;
}

interface ContractABI {
  anonymous?: boolean
  inputs?: Array<{
    internalType: string
    name: string
    type: string
  }>
  name?: string
  outputs?: Array<{
    internalType: string
    name: string
    type: string
  }>
  stateMutability?: string
  type?: string
}
