import { expect, it } from 'vitest'
import type { JsonRpcSigner } from 'ethers'
import { Contract, JsonRpcProvider } from 'ethers'
import ABI from '../../abi-example/ABI.json'
import { defineContractInstance, extractMethods } from './contract'

it('should create a contract instance', async () => {
  let provider
  if (typeof window !== 'undefined' && window.ethereum)
    provider = new JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/ckN344g49RcvfHyjzwu3QUPKl71HDLnk')

  const contract = defineContractInstance({
    abi: ABI.abi,
    address: '0x167BF45892ad66FD9c13e113239DDE96C9619259', // MintCross sepolia address
    provider,
  })

  if (contract)
    expect(contract).instanceof(Contract)
})

it('should extract methods from contract instance', async () => {
  let provider
  if (typeof window !== 'undefined' && window.ethereum)
    provider = new JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/ckN344g49RcvfHyjzwu3QUPKl71HDLnk')

  const signer = await provider?.getSigner('0x9366923F46c2397B5Cc7c5Bf57fdB1459650FFa1')
  const contract = defineContractInstance({
    abi: ABI.abi,
    address: '0x167BF45892ad66FD9c13e113239DDE96C9619259', // MintCross sepolia address
    signer: signer as JsonRpcSigner,
  })

  if (contract) {
    const { balanceOf } = await extractMethods(contract)

    expect(balanceOf('0x167BF45892ad66FD9c13e113239DDE96C9619259')).greaterThan(0)
  }
})
