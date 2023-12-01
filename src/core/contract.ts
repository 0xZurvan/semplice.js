import ethers, { Contract } from 'ethers'
import type { ContractInstance, Function } from '../types'

type MethodsRecord<T extends Record<string, Function>> = {
  [K in keyof T]: Function<Parameters<T[K]>, ReturnType<T[K]>>;
}

export function defineContractInstance({ abi, address, provider }: ContractInstance): Contract {
  const contract = new Contract(address, abi, provider)
  return contract
}

export function extractMethods<T extends Record<string, Function>>(
  contract: Contract,
): MethodsRecord<T> {
  const contractInterface = contract.interface

  const methods: MethodsRecord<T> = contractInterface.fragments
    .filter(fragment => fragment.type === 'function')
    .reduce<MethodsRecord<T>>((acc, func) => {
      if (ethers.FunctionFragment.isFunction(func)) {
        const functionFragment = func as ethers.FunctionFragment
        acc[functionFragment.name as keyof T] = async (...args: Parameters<T[keyof T]>) => {
          const result = await contract[functionFragment.name](...args)
          return result
        }
      }
      return acc
    }, {} as MethodsRecord<T>)

  return methods
}

// check if it is type payable
// check if
/* export async function executeMethod() {
  try {
    if() {

    }
  } catch (error) {
    console.error(error)
  }
} */
