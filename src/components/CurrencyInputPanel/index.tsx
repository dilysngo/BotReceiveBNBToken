import React from 'react'
import { Currency, Pair } from '@pancakeswap-libs/sdk'
import { Text } from 'claim-libs-uikit'
import styled from 'styled-components'
import { darken } from 'polished'
import DownIconWhite from 'assets/images/down-icon-white.png'
import useI18n from 'hooks/useI18n'
import CurrencyLogo from '../CurrencyLogo'
import { RowBetween } from '../Row'
import { Input as NumericalInput } from '../NumericalInput'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`
const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 34px;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translate(0, -50%);
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
  color: ${({ selected, theme }) => (selected ? theme.colors.text : '#FFFFFF')};
  :focus,
  :hover {
    background-color: ${({ theme }) => darken(0.05, theme.colors.input)};
  }
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.colors.textSubtle)};
  }
`
const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  // background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`
const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

interface CurrencyInputPanelProps {
  label?: string
  value?: string
  onUserInput?: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  id: string
  showCommonBases?: boolean
  [x: string]: unknown
}
export default function CurrencyInputPanel({
  label,
  value,
  // onUserInput,
  // onMax,
  // showMaxButton,
  // onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  // hideBalance = false,
  // pair = null, // used for double token logo
  hideInput = false,
  id,
  // showCommonBases,
  ...props
}: CurrencyInputPanelProps) {
  const TranslateString = useI18n()
  const translatedLabel = label || TranslateString(132, 'Input')

  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <Text fontSize="18px" color="textLight">
                {translatedLabel}
              </Text>
            </RowBetween>
          </LabelRow>
        )}

        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
          {!hideInput && (
            <NumericalInput
              className="token-amount-input"
              value={value}
              placeholder="1.00"
              {...props}
            />
          )}

          {currency && (
            <CurrencySelect
              selected={!!currency}
              className="open-currency-select-button"
              onClick={() => null}
            >
              <Aligner>
                <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
                <Text color="textLight" fontSize="18px">
                  {(currency && currency.name && currency.name.length > 20
                    ? `${currency.name.slice(0, 4)}...${currency.name.slice(currency.name.length - 5, currency.name.length)}`
                    : currency?.name) || TranslateString(1196, 'Select a currency')}
                </Text>
                {!disableCurrencySelect && <img style={{ marginLeft: '6px' }} src={DownIconWhite} width={13} alt="" />}
              </Aligner>
            </CurrencySelect>
          )}
          
        </InputRow> 
      </Container>
      
    </InputPanel>
  )
}
