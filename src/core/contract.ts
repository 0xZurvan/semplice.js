import { Contract, FunctionFragment } from 'ethers'
import type { JsonRpcProvider, JsonRpcSigner } from 'ethers'

interface ContractInstance {
  abi: ContractABI[]
  address: string
  provider?: JsonRpcProvider | undefined
  signer?: JsonRpcSigner | undefined
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

type MethodsRecord<T extends Record<string, Function>> = {
  [K in keyof T]: Function<Parameters<T[K]>, ReturnType<T[K]>>;
}

export function defineContract({ abi, address, provider, signer }: ContractInstance): Contract {
  let contract = new Contract(address, abi, provider)
  if (signer)
    contract = new Contract(address, abi, signer)
  return contract
}

export async function useContract<T extends Record<string, Function>>(
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
