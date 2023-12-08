import { Contract, FunctionFragment, JsonRpcSigner } from 'ethers'
import type { ContractInstance, Function, MethodsRecord } from '../types/types'

export * from 'ethers'

export async function defineContract({ abi, address, provider, type = 'call' }: ContractInstance): Promise<Contract | undefined> {
  try {
    let contract: Contract
    if (type === 'call' && provider) {
      const signer = await provider.getSigner()
      contract = new Contract(address, abi, signer)
      // eslint-disable-next-line no-console
      console.log('contract', contract)
    }
    else {
      contract = new Contract(address, abi, provider)
      // eslint-disable-next-line no-console
      console.log('contract', contract)
    }
    
    return contract
  }
  catch (error) {
    console.error(error)
  }
}

export function useContract<T extends Record<string, Function>>(
  contract: Contract
): MethodsRecord<T> {
  const contractInterface = contract.interface

  const methods: MethodsRecord<T> = contractInterface.fragments
    .filter(fragment => fragment.type === 'function')
    .reduce<MethodsRecord<T>>((acc, func) => {
      if (FunctionFragment.isFunction(func)) {
        const functionFragment = func as FunctionFragment
        acc[functionFragment.name as keyof T] = async (...args: Parameters<T[keyof T]>) => {
          const result = await contract[functionFragment.name](...args)
          return result
        }
      }
      return acc
    }, {} as MethodsRecord<T>)

  return methods
}
