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
  indexed?: boolean
  inputs?: {
    internalType: string
    name: string
    type: string
  }[]
  name?: string
  stateMutability?: 'nonpayable' | 'payable' | 'view' | 'pure'
  type: 'constructor' | 'event' | 'function'
}
