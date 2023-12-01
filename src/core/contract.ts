import ethers, { Contract } from 'ethers'
import type { IContractInstance } from '../types'

export function defineContractInstance({ ABI, address, provider }: IContractInstance): Contract {
  const contract = new Contract(address, ABI, provider)
  return contract
}

export function extractMethods(contract: Contract) {
  const contractInterface = contract.interface

  const methods: Record<string, (...args: unknown[]) => Promise<unknown>> = contractInterface.fragments
    .filter(fragment => fragment.type === 'function')
    .reduce<Record<string, (...args: unknown[]) => Promise<unknown>>>((acc, func) => {
      if (ethers.FunctionFragment.isFunction(func)) {
        const functionFragment = func as ethers.FunctionFragment
        acc[functionFragment.name] = async (...args: unknown[]) => {
          // Use the contract method with the given arguments
          const result = await contract[functionFragment.name](...args)
          return result
        }
      }
      return acc
    }, {})

  return methods
}
