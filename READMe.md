 

# Semplice.js 👌

`v0.0.1`  `0xZurvan`

Simplify contract integration with our Web3 library, powered by ethers.js. Seamlessly connect and integrate your contracts with unparalleled ease, elevating your Web3 experience without the unnecessary complexity.

- **Ease of Use**: Execute your contract methods in just three simple steps.
- **TypeScript Support**: Enjoy full compatibility with TypeScript for enhanced development workflows.
- **Type Availability**: Access all ethers.js and semplice.js types effortlessly.
- **Reusability and Code Reduction**: Embrace reusability and code reduction for cleaner, more maintainable code.
- **Framework and Library Friendly**: Integrate seamlessly with you choice of frameworks and libraries.
- **CJS and MJS Support**: Fully supports both CommonJS (CJS) and ECMAScript Modules (MJS), providing flexibility for a wide range of project setups.


## Get started

```
// Install
npm install semplice.js

```

## Usage

#### 1. Define your provider

``` TS
import { defineProvider } from 'semplice.js/runner'

const provider = defineProvider()

```
#### 2. Define your config objects
> **NOTE**:  You can add your contract configuration object directly in your components or in a separate file.

```TS
// sempliceConfig.ts
import { defineConfig, Config } from 'semplice.js'
import { defineProvider } from 'semplice.js/runner'
import ABI from './abi-example/ABI.json';

const provider = defineProvider()
export const contractAConfig: Config = defineConfig({
  abi: ABI.abi,
  // Contract address
  address: '0x167BF45892ad66FD9c13e113239DDE96C9619259',
  provider: provider
})

export const contractBConfig: Config = defineConfig({
  abi: ABI.abi,
  address: '0x167BF45892ad66FD9c13e113239DDE96C9619259',
  provider: provider
})

```

#### 3. Use your contract methods

```TS
// Add your configs
import { contractAConfig, contractBConfig } from 'sempliceConfig.ts'
// Add useContract to extract the methods 
import { useContract } from 'semplice.js'

// Pass your configs to useContract and destructure your methods
const { methodA, methodB } = useContract(contractAConfig)
const { methodC } = useContract(contractBConfig)

// Call your function in JSX, Vue template, etc
const callMethodA = async (amount: number) => {
  await methodA(amount)
}

const callMethodB = async (amount: number) => {
  await methodB(amount)
}

const callMethodC = async (address: string) => {
  await methodC(address)
}


```

## Examples

#### Vue example:
```TS
<script setup lang="ts">
import { useContract, defineConfig } from 'semplice.js';
import { connectWallet } from 'semplice.js/address';
import { defineProvider } from 'semplice.js/runner';
import { ref } from 'vue';
import ABI from './abi-example/ABI.json';

const address = ref<string>()
const provider = defineProvider()

const config = defineConfig({
  abi: ABI.abi,
  // Contract address
  address: '0x167BF45892ad66FD9c13e113239DDE96C9619259',
  provider: provider
})

const { buy, balanceOf } = useContract(config)

const connect = async () => {
  const data = await connectWallet()
  if(data) 
    address.value = data.address

}

const getBalance = async () => {
  const balance = await balanceOf(address.value)
  console.log('balance', balance)
}


const mint = async () => {
  await buy(1)
}


</script>

<template>
  <div>
    <h1>Vue Example</h1>
    <button @click="connect">Connect Wallet</button>
    <button @click="getBalance">Get balance</button>
    <button @click="mint">Mint</button>

    <p>{{ address }}</p>
  </div>
</template>

```

#### React example:
```TS
import { useContract, defineConfig } from 'semplice.js';
import { connectWallet } from 'semplice.js/address';
import { defineProvider } from 'semplice.js/runner';
import { useState } from 'react';
import ABI from './abi-example/ABI.json';

export default function Example() {
  const [address, setAddress] = useState('')
  const provider = defineProvider() 

  const config = defineConfig({
    abi: ABI.abi,
    // Contract address
    address: '0x167BF45892ad66FD9c13e113239DDE96C9619259',
    provider: provider
  })

  const { buy, balanceOf } = useContract(config)

  const connect = async () => {
    const data = await connectWallet()
    if(data) 
      setAddress(data.address)
  }

  const getBalance = async () => {
    const balance = await balanceOf(address)
    console.log('balance', balance)
  }
  
  const mint = async () => {
    await buy(1)
  }

  return (
    <div>
      <h1>React Example</h1>
      <button onClick={connect}>Connect Wallet</button>
      <button onClick={getBalance}>Get balance</button>
      <button onClick={mint}>Mint</button>
    </div>
  )
}

```

