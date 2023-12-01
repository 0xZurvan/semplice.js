import type { Provider } from 'ethers'

// Contract type definition
export interface IContractInstance {
  ABI: ContractABI[]
  address: string
  provider: Provider
}

// ABI type definition
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
