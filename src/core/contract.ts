import type { FunctionFragment, Signer } from 'ethers'
import { Contract, ethers } from 'ethers'
import type { Config, ContractMethods, Function, Unit } from '../types/types'

export * from 'ethers'
export * from '../types/types'

export function defineConfig({ abi, address, provider }: Config): Config {
  const config: Config = {
    abi,
    address,
    provider,
  }
  return config
}

export function useContract(
  config: Config,
): ContractMethods<{ [methodName: string]: Function }> {
  const contract = new Contract(config.address, config.abi, config.provider)

  const result: ContractMethods<{ [methodName: string]: Function }> = {}

  const generateMethods = async () => {
    const functionFragments = contract.interface.fragments.filter(
      fragment => fragment.type === 'function',
    ) as FunctionFragment[]

    for (const functionFragment of functionFragments) {
      const { name } = functionFragment

      result[name] = async (...args: any[]) => {
        if (!config.provider)
          throw new Error('Provider is not defined in the configuration.')

        const signer = await config.provider.getSigner()
        const contractWithSigner = contract.connect(signer as Signer)

        const result = await (contractWithSigner as any)[name](...args)
        return result
      }
    }
  }

  generateMethods()

  return result
}

export function setValue(value: string | number, unit: Unit) {
  const formattedValue: bigint = typeof value === 'number'
    ? ethers.parseUnits(value.toString(), unit)
    : ethers.parseUnits(value, unit)

  return formattedValue
}
