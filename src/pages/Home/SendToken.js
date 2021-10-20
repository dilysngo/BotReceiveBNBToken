/* eslint-disable prefer-const */
import React, { useEffect } from 'react'
import Web3 from 'web3'
import Tx from 'ethereumjs-tx'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const Tx = require('ethereumjs-tx')

const providerUrl = 'https://data-seed-prebsc-2-s1.binance.org:8545/'
const chainId = 97
const gasLimit = 3000000


// Who holds the token now? nguoi gui
const myAddress = '0x1a26613d922cBb776887BCF91dAf45Ac44da6aeA'
const privateKey = '03bf91c12427747281b78facbbf5889caffb5791e512f3995e15af5222c66d57'

// Who are we trying to send this token to? // nguoi nhan
const destAddress = '0x0C3898ABdBE317C10a07fe4913836de3851CbaFC'

// So tien gui
const transferAmount = 1 

// ABI token
const abiArray = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'INITIAL_SUPPLY',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseApproval',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_addedValue',
        type: 'uint256',
      },
    ],
    name: 'increaseApproval',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
]

const Index = () => {

  function financialMfil(numMfil, decimals) {
    return Number.parseFloat(numMfil / 10 ** decimals)
  }

  useEffect(() => {
    const web3 = new Web3(Web3.givenProvider || providerUrl)

    const main = async () => {
      // Determine the nonce
      const count = await web3.eth.getTransactionCount(myAddress)
      console.log(`num transactions so far: ${count}`)
    
      // The address of the contract which created MFIL
      const contractAddress = '0x8bE4a9Ba27Dc9566a924eA1A802de170E6Ff8Eda' // saros token testnet
      const contract = new web3.eth.Contract(abiArray, contractAddress, {
        from: myAddress,
      })

      // How many tokens do I have before sending?
      let symbol = await contract.methods.symbol().call()
      let decimals = await contract.methods.decimals().call()
      let balance = await contract.methods.balanceOf(myAddress).call()
      console.log(`Balance before send: ${financialMfil(balance, decimals)} ${symbol}\n------------------------`)
      // I chose gas price and gas limit based on what ethereum wallet was recommending for a similar transaction. You may need to change the gas price!
      // Use Gwei for the unit of gas price
      // Chain ID of Ropsten Test Net is 3, replace it to 1 for Main Net
      const rawTransaction = {
        from: myAddress,
        nonce: `0x${count.toString(16)}`,
        gasPrice: web3.utils.toHex(20000000000),
        gasLimit: web3.utils.toHex(gasLimit),
        to: contractAddress,
        value: '0x0',
        data: contract.methods.transfer(destAddress, transferAmount).encodeABI(),
        chainId,
        // value: transferAmount * 10 ** 18, 
        // gasLimit: 21000, 
        // gasPrice: '20000000000'
      }
      console.log(`Raw of Transaction: \n${JSON.stringify(rawTransaction, null, '\t')}\n------------------------`)
      // The private key for myAddress in .env
      const privKey = Buffer.from(privateKey, 'hex')
      const tx = new Tx(rawTransaction)
      tx.sign(privKey)
      const serializedTx = tx.serialize()
      // Comment out these four lines if you don't really want to send the TX right now
      console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}\n------------------------`)
      const receipt = await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
      // The receipt info of transaction, Uncomment for debug
      console.log(`Receipt info: \n${JSON.stringify(receipt, null, '\t')}\n------------------------`)
      // The balance may not be updated yet, but let's check
      balance = await contract.methods.balanceOf(myAddress).call()
      console.log(`Balance after send: ${financialMfil(balance)} MFIL`)
    }
    main()
  }, [])


  return <div>asdsa</div>
}

export default Index
