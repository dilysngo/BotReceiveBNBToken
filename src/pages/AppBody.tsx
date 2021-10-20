import React from 'react'
import styled from 'styled-components'
import { Card } from 'claim-libs-uikit'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 64px);
  padding-top: 100px;
  padding-bottom: 100px;
` 
const Header = styled.div`
  width: 100%;
  max-width: 242px;
  margin: auto;
  text-align: center; 
  padding: 0 10px;
  margin-bottom: 18px;

  img {
    width: 100%;
    height: auto;
  }
`
export const BodyWrapper = styled(Card)`
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  background-color: unset;
  overflow: unset;

  .pet-red {
    width: 140px;
    height: auto;

    position: absolute;
    top: -134px;
    left: -280px;
  }
  .pet-blue-sky {
    width: 132px;
    height: auto;

    position: absolute;
    top: -114px;
    right: -275px;
  }
  .pet-yellow {
    width: 140px;
    height: auto;

    position: absolute;
    top: 180px;
    left: -222px;
  }
  .pet-ping {
    width: 132px;
    height: auto;

    position: absolute;
    top: 180px;
    right: -217px;
  }
`
/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {

  return (
    <Wrapper>
      <Header>
        <img src="/images/logo/logo-text.png" alt="" />
      </Header>
      <BodyWrapper>
        <img className="pet pet-red" src="/images/pets/pet-red.png" alt=""/>
        <img className="pet pet-blue-sky" src="/images/pets/pet-blue-sky.png" alt=""/>
        <img className="pet pet-yellow" src="/images/pets/pet-yellow.png" alt=""/>
        <img className="pet pet-ping" src="/images/pets/pet-ping.png" alt=""/>
        {children}
      </BodyWrapper>
    </Wrapper>
  )
}
