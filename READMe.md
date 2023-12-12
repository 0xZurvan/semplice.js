 

# semplice.js 👌

Simplify contract integration with our Web3 library, powered by ethers.js. Seamlessly connect and integrate your contracts with unparalleled ease, elevating your Web3 experience without the unnecessary complexity.

- **Ease of Use**: Execute your contract methods in just three simple steps.
- **TypeScript Support**: Enjoy full compatibility with TypeScript for enhanced development workflows.
- **Type Availability**: Access all ethers.js and semplice.js types effortlessly.
- **Reusability and Code Reduction**: Embrace reusability and code reduction for cleaner, more maintainable code.
- **Framework and Library Friendly**: Integrate seamlessly with you choice of frameworks and libraries.


## Installation

```
npm install -D semplice.js

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
import { defineConfig, Config } from 'semplice.js'
import ABI from './abi-example/ABI.json';

export const contractAConfig: Config = defineConfig({
  abi: ABI.abi,
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
// your want to use from your contracts
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