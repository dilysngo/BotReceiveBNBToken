import { useEffect, useState, useCallback } from 'react'
import { useStakingContract } from 'hooks/useCreateContract'

const  useGetStartAndEndTime = (): any => {
  const [data, setData] = useState<any>([undefined, undefined])
  const contractMethod = useStakingContract()

  const getData = useCallback(async () => {
    if (contractMethod) {
      try {
        Promise.all([
          contractMethod.methods._startTime().call(),
          contractMethod.methods._endTime().call()
        ]).then(([start, end]) => {
          // setData([1630563423856 + (1000 * 60 * 60 * 3 - (1000*60*13)), 1630563423856 + (1000 * 60 * 60 * 5)- (1000*60*55)]);
          // setData([+start * 1000 + (1000 * 60 * 60 * 24 * 20) - (1000 * 60 * 60 * 18) - (1000 * 60 * 49), +end * 1000 - (1000 * 60 * 60 * 24 * 347) - (1000 * 60 * 60 * 16) - (1000 * 60 * 44)]);
          setData([+start * 1000, +end * 1000]);
        })
      } catch (error) { 
        console.error(error)
      }
    }
  }, [contractMethod])

  useEffect(() => {
    getData()
  }, [getData])

  return [...data, getData]
}

export default useGetStartAndEndTime
