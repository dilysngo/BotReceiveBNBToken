import { useEffect, useState, useCallback } from 'react'
import { useStakingContract } from 'hooks/useCreateContract'
import { useGetProfileAccount } from '../state/application/hooks';

const useGetTotalWasSale = () : [number | undefined, () => Promise<void>] => {
  const [data, setData] = useState<number | undefined>(undefined)
  const contractMethod = useStakingContract()
  const accountInfo = useGetProfileAccount()

  const getData = useCallback(async () => {
    if (contractMethod) {
      try {
        const respon = await contractMethod.methods.wasSale().call()
        setData(respon / 1e18)
      } catch (error) { 
        console.error(error)
      }
    }
  }, [contractMethod])

  useEffect(() => {
    getData()
  }, [getData, accountInfo])

  return [data, getData]
}

export default useGetTotalWasSale
