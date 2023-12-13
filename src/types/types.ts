import type { BigNumberish, BrowserProvider, JsonRpcProvider, Signer } from 'ethers'

export type ProviderInstance = BrowserProvider | JsonRpcProvider

export interface ContractInstance {
  abi: ContractABI[]
  address: string
  provider?: ProviderInstance | undefined
  signer?: Signer | undefined
}

export interface Function<T extends unknown[] = unknown[], U = any> {
  (...args: T): Promise<U>
}

export type ContractMethods<T extends Record<string, Function>> = {
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

export interface Config extends ContractInstance {}

export type Unit = 'wei' | 'kwei' | 'mwei' | 'gwei' | 'szabo' | 'finney' | 'ether';

export interface Options {
  gasLimit?: string | number
  maxGasLimit?: string | number
  nonce?: number | undefined
  value?: bigint
}
