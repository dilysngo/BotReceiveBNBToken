import { useEffect, useState, useCallback } from 'react'
import { useStakingContract } from 'hooks/useCreateContract'

const useGetFeeClaim = (): [number, () => Promise<void>] => {
  const contractMethod = useStakingContract()
  const [data, setData] = useState<number>(0)

  const getData = useCallback(async () => {
    if (contractMethod) {
      try {
        const resultFee = await contractMethod.methods.PROJECT_FEE().call()
        setData(+(resultFee||0) / 1e18)
      } catch (error) { 
        console.error(error) 
      }
    }
  }, [contractMethod])

  useEffect(() => {
    getData()
  }, [getData])

  return [data, getData]
}

export default useGetFeeClaim
