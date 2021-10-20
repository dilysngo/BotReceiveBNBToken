import { useEffect, useState, useCallback } from 'react'
import useGetStartAndEndTime from 'hooks/useGetStartAndEndTime' 

const useGetDayRemaining = (): [number|undefined] => {
  const [startRegister] = useGetStartAndEndTime()
  const [data, setData] = useState<number|undefined>(undefined)

  const getData = useCallback(async () => {
    if(startRegister) {
      const startDays = new Date(+startRegister).getTime();
      const toDay = new Date().getTime();
      const dayRemaining = startDays - toDay;
      // setData(dayRemaining < 100 ? 100 : dayRemaining)
      setData(1000 * 5)
    }
  }, [startRegister])

  useEffect(() => {
    getData()
  }, [getData])

  return [data]
}

export default useGetDayRemaining
