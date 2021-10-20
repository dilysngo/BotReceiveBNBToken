import React, { ReactNode } from 'react'
import styled from 'styled-components'
import {  Text, Flex } from 'claim-libs-uikit'
// import { Heading, IconButton, Text, Flex, useModal, CogIcon, Svg } from 'claim-libs-uikit'
// import useI18n from 'hooks/useI18n'
// import SettingsModal from './SettingsModal'
// import RecentTransactionsModal from './RecentTransactionsModal'

interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}

const StyledPageHeader = styled.div`
  // border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  // padding: 15px 24px 0;
`

const Details = styled.div`
  flex: 1;
` 

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  return (
    <StyledPageHeader>
      <Flex alignItems="center">
        <Details>
          <Text color="primary" fontSize="28px" fontWeight="600" mb="8px">{title}</Text>
          {description && ( 
            <Text color="textSubtle" fontSize="24px">
              {description}
            </Text> 
          )}
        </Details>
      </Flex>
      {children && <Text mt="16px">{children}</Text>}
    </StyledPageHeader>
  )
}

export default PageHeader
