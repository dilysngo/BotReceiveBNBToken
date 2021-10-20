import React from 'react'
import styled from 'styled-components'
import { Button } from 'claim-libs-uikit'

const CustomButton = styled(Button)`
  border-radius: 9px;
  border: 3px solid #BF6A0F;
`

const Index = ({ children, ...otherProps }) => {
  return (
    <>
      <CustomButton type="button" {...otherProps}>
        {children}
      </CustomButton>
    </>
  )
}

export default Index
