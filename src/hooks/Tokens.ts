import { parseBytes32String } from '@ethersproject/strings'
import { Currency, ETHER, Token } from '@pancakeswap-libs/sdk'
import { useMemo } from 'react'
import { cloneDeep } from "lodash";
import useGetAllCampaigns from "hooks/useGetAllCampaigns"
import { useStakingContract } from "hooks/useCreateContract"
import { useSelectedTokenList } from '../state/lists/hooks'
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks'
import { isAddress } from '../utils'
import { useActiveWeb3React } from './index'
import { useBytes32TokenContract, useTokenContract } from './useContract'

export function useAllTokens(): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()

  // token from github
  const allTokens = useSelectedTokenList()

  // token from contract
  const contractMethod = useStakingContract()
  const { allCampaigns } = useGetAllCampaigns(contractMethod)

  return useMemo(() => {
    if (!chainId || allCampaigns && allCampaigns.length < 1) return {}
    const tokenChain: any = cloneDeep(allTokens[chainId])
    
    for(let i = 0; i < allCampaigns.length; i++) {
      if(tokenChain[allCampaigns[i].token]) {
        tokenChain[allCampaigns[i].token].id = allCampaigns[i].id
        tokenChain[allCampaigns[i].token].name = allCampaigns[i].name
        tokenChain[allCampaigns[i].token].token = allCampaigns[i].token
        tokenChain[allCampaigns[i].token].owner = allCampaigns[i].owner
        tokenChain[allCampaigns[i].token].totalClaimed = allCampaigns[i].totalClaimed
        tokenChain[allCampaigns[i].token].totalAmount = allCampaigns[i].totalAmount
        tokenChain[allCampaigns[i].token].isStopped = allCampaigns[i].isStopped
        tokenChain[allCampaigns[i].token].amountPerClaim = allCampaigns[i].amountPerClaim
      }
    }
    return tokenChain
  }, [chainId, allTokens, allCampaigns])
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/
function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0 ? str : bytes32 && BYTES32_REGEX.test(bytes32) ? parseBytes32String(bytes32) : defaultValue
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress?: string): Token | undefined | null {
  const { chainId } = useActiveWeb3React()
  // const tokens = useAllTokens()
  const tokens = [];

  const address = isAddress(tokenAddress)

  const tokenContract = useTokenContract(address || undefined, false)
  const tokenContractBytes32 = useBytes32TokenContract(address || undefined, false)
  const token: Token | undefined = address ? tokens[address] : undefined

  const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD)
  const tokenNameBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'name', undefined, NEVER_RELOAD)
  const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD)
  const symbolBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD)
  const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD)

  return useMemo(() => {
    if (token) return token
    if (!chainId || !address) return undefined
    if (decimals.loading || symbol.loading || tokenName.loading) return null
    if (decimals.result) {
      return new Token(
        chainId,
        address,
        decimals.result[0],
        parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
        parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token')
      )
    }
    return undefined
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result,
  ])
}

export function useCurrency(currencyId: string | undefined): Currency | null | undefined {
  const isBNB = currencyId?.toUpperCase() === 'BNB'
  const token = useToken(isBNB ? undefined : currencyId)
  return isBNB ? ETHER : token
}
