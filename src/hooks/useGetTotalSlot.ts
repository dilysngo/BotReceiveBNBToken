import { useEffect, useState, useCallback } from 'react'
import { useStakingContract } from 'hooks/useCreateContract'

const useGetTotalSlot = () : [number|undefined, () => Promise<void>] => {
  const [data, setData] = useState<number|undefined>()
  const contractMethod = useStakingContract()

  const getData = useCallback(async () => {
    if (contractMethod) {
      try {
        const resultFee = await contractMethod.methods.TOTAL_SLOT().call()
        setData(+resultFee)
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

export default useGetTotalSlot
