import { expect, it } from 'vitest'
import { Contract, JsonRpcProvider, ethers } from 'ethers'
import ABI from '../../abi-example/ABI.json'
import { connectWallet } from '../address/address'
import { defineContract, extractMethods } from './contract'

it('should create a contract instance', async () => {
  let provider
  if (typeof window !== 'undefined' && window.ethereum)
    provider = new JsonRpcProvider( )

  const contract = defineContract({
    abi: ABI.abi,
    address: '0x167BF45892ad66FD9c13e113239DDE96C9619259', // MintCross sepolia address
    provider,
  })

  expect(contract).instanceof(Contract)
})

it('should extract methods from contract instance', async () => {
  const wallet = await connectWallet()
  if(!wallet) 
    return undefined

  const contract = defineContract({
    abi: ABI.abi,
    address: '0x167BF45892ad66FD9c13e113239DDE96C9619259', // MintCross sepolia address
    signer: wallet.signer,
  })

  const { balanceOf, buy } = await extractMethods(contract)
  await buy(1 * 1e18)
  const balance = await balanceOf('0x9366923F46c2397B5Cc7c5Bf57fdB1459650FFa1')

  expect(balance).toEqual(ethers.parseUnits('7', 18))
})
