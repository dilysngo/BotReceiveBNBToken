/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react'
import Web3 from 'web3'

const { randomBytes } = require('crypto')
// const secp256k1 = require('secp256k1')

const providerUrl = 'https://bsc-dataseed.binance.org/'
// const providerUrl = 'https://data-seed-prebsc-2-s1.binance.org:8545/'

const list = []

const web3 = new Web3(providerUrl)

const init = async () => {
  try {
    const priKey = randomBytes(32).toString('hex')
    const address = await web3.eth.accounts.privateKeyToAccount(priKey)?.address
    if (address) {
      const balance = await web3.eth.getBalance(address)
      if (balance && +balance > 0) {
        list.push(priKey)
      }
    }

    init()
    // eslint-disable-next-line no-empty
  } catch (error) {
    init()
  }
}

const Index = () => {
  const [data, setData] = useState([])
  const [count, setCount] = useState(1)

  useEffect(() => {
    init()
  }, [])

  setInterval(() => {
    if (list.length > 0 && list.length < 20) {
      const oldData = localStorage.getItem('Bot:money') || []
      localStorage.setItem('Bot:money', JSON.stringify([...list, ...oldData]))
      setData(list)
    }
  }, 5000)

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          init()
          setCount(count + 1)
        }}
      >
        UP: {count}
      </button>
      <div>
        {data.map((item) => {
          return <div key={(item || '').toString()}>{item}</div>
        })}
      </div>
    </div>
  )
}

export default Index
