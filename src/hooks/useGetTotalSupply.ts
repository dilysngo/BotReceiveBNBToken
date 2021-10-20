import { useEffect, useState, useCallback } from 'react'
import { useStakingContract } from 'hooks/useCreateContract'

const useGetTotalSupply = () : [number | undefined, () => Promise<void>] => {
  const [data, setData] = useState<number | undefined>(undefined)
  const contractMethod = useStakingContract()

  const getData = useCallback(async () => {
    if (contractMethod) {
      try {
        const respon = await contractMethod.methods.totalSupply().call()
        setData(respon / 1e18)
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

export default useGetTotalSupply
