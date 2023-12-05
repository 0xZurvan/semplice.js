import { Contract, FunctionFragment } from 'ethers'
import type { ContractInstance, Function } from '../../types/types'

type MethodsRecord<T extends Record<string, Function>> = {
  [K in keyof T]: Function<Parameters<T[K]>, ReturnType<T[K]>>;
}

export function defineContractInstance({ abi, address, provider, signer }: ContractInstance): Contract {
  let contract = new Contract(address, abi, provider)

  if (signer)
    contract = new Contract(address, abi, signer)

  return contract
}

export async function extractMethods<T extends Record<string, Function>>(
  contract: Contract,
): Promise<MethodsRecord<T>> {
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
