import { useEffect, useState, useCallback } from 'react'

const useGetAllCampaigns = (contract: any) => {
  const [allCampaigns, setAllCampaigns] = useState<any>([])

  const getAllCampaigns = useCallback(async () => {
    if (contract) {
      try {
        let result = await contract.methods.getAllCampaigns().call()
        result = result.filter(v => v.token !== '0x0000000000000000000000000000000000000000')
        setAllCampaigns(result)
      } catch (error) { 
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
  }, [contract, setAllCampaigns])

  useEffect(() => {
    getAllCampaigns()
  }, [getAllCampaigns])

  return { allCampaigns, getAllCampaigns }
}

export default useGetAllCampaigns
