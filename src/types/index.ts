import type { BigNumberish, Provider } from 'ethers'

interface ContractInstance {
  abi: ContractABI[]
  address: string
  provider: Provider
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

interface Function<T extends unknown[] = unknown[], U = any> {
  (...args: T): Promise<U>
}

interface FunctionExecutionParams {
  func: Function
  loadingToggle?: (loading?: boolean) => void
  options?: {
    value: BigNumberish
    gasLimit: string
    maxGasLimit: string
  }
}

export type {
  FunctionExecutionParams,
  Function,
  ContractInstance,
}
