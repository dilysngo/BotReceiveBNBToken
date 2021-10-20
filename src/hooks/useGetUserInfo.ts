import { useEffect, useState, useCallback } from 'react'
import { useStakingContract } from 'hooks/useCreateContract'
import { useWeb3React } from '@web3-react/core';

const useGetTotalSupply = () : [any, () => Promise<void>] => {
  const { account } = useWeb3React()
  const [data, setData] = useState<any>()
  const contractMethod = useStakingContract()

  const getData = useCallback(async () => {
    if (contractMethod) {
      try {
        const respon = await contractMethod.methods.getUserInfo(account).call()
        setData(respon)
      } catch (error) { 
        console.error(error)
      } 
    }
  }, [account, contractMethod])

  useEffect(() => {
    getData()
  }, [getData])

  return [data, getData]
}

export default useGetTotalSupply
