import React from 'react'
import {  Text } from 'claim-libs-uikit'

interface TradePriceProps {
  price: {
    fee: number,
    symbol: string
  }
}

export default function TradePrice({ price }: TradePriceProps) {
  const formattedPrice = price.fee 
  const label = price.symbol  

  return (
    <Text fontSize="18px" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      {formattedPrice ?? '-'} {label}
    </Text>
  )
}
