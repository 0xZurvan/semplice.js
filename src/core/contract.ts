import type { Signer } from 'ethers'
import { Contract, FunctionFragment } from 'ethers'
import type { ContractInstance, Function, MethodsRecord } from '../types/types'

export * from 'ethers'

export async function defineContract({ abi, address, provider, type = 'query' }: ContractInstance): Promise<Contract | undefined> {
  try {
    if (type === 'call' && provider !== undefined) {
      const signer: Signer = await provider.getSigner()
      // eslint-disable-next-line no-console
      console.log('signer', signer)
      const contract: Contract = new Contract(address, abi, signer)
      // eslint-disable-next-line no-console
      console.log('contract', contract)
      return contract
    }
    else {
      const contract: Contract = new Contract(address, abi, provider)
      // eslint-disable-next-line no-console
      console.log('contract', contract)
      return contract
    }

  }
  catch (error) {
    console.error(error)
  }
}

export function useContract<T extends Record<string, Function>>(
  contract: Contract,
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
