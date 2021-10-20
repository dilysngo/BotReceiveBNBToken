import React from 'react'
import styled from 'styled-components'

// Bg only component
const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(/images/background/bg.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: calc(100vh - 64px);
  position: relative;
`

export default function WrapperContent({ children }: { children: React.ReactNode }) {
  return (
    <BodyWrapper>
      {children}
    </BodyWrapper>
  )
}
