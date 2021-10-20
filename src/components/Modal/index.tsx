import React from 'react'
import styled, { css } from 'styled-components'
import { animated, useTransition } from 'react-spring'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { isMobile } from 'react-device-detect'
import '@reach/dialog/styles.css'
import { transparentize } from 'polished'

const AnimatedDialogOverlay = animated(DialogOverlay)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    z-index: 2;
    background-color: transparent;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.3);
  }
`

const AnimatedDialogContent = animated(DialogContent)
// destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogContent = styled(({ minHeight, maxHeight, mobile, isOpen, ...rest }) => (
  <AnimatedDialogContent {...rest} />
)).attrs({
  'aria-label': 'dialog',
})`
  &[data-reach-dialog-content] {
    width: 94%;
    max-width: 435px;

    padding: 6px;
    margin: 50px 0 0 0;
    
    display: flex;
    align-self: ${({ mobile }) => (mobile ? 'flex-end' : 'center')};

    border-radius: 28px;
    background: linear-gradient(to bottom, #F46531 0%, #F4CD64 100%);
    box-shadow: 0 4px 8px 0 ${transparentize(0.95, '#191326')};

    overflow: hidden;

    ${({ maxHeight }) => 
      maxHeight &&
      css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
 

    ${({ theme }) => theme.mediaQueries.lg} {
      width: 65vw;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 85vw;
    }
  }
`
const SubBackground = styled.div`
  width: 100%;
  background: linear-gradient(to top, rgba(244,231,149,1) 0%, rgba(244,207,103,1) 14%, rgba(244,179,49,1) 48%, rgba(244,204,98,1) 100%);
  border-radius: 22px;
`
interface ModalProps {
  isOpen: boolean
  onDismiss: () => void
  minHeight?: number | false
  maxHeight?: number
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
}

export default function Modal({
  isOpen,
  onDismiss,
  minHeight = false,
  maxHeight = 50,
  initialFocusRef,
  children,
}: ModalProps) {
  const fadeTransition = useTransition(isOpen, null, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <>
      {fadeTransition.map(
        ({ item, key, props }) =>
          item && (
            <StyledDialogOverlay key={key} style={props} onDismiss={onDismiss} initialFocusRef={initialFocusRef}>
              <StyledDialogContent
                aria-label="dialog content"
                minHeight={minHeight}
                maxHeight={maxHeight}
                mobile={isMobile}
              >
                <SubBackground>
                  {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                  {/* eslint-disable */}
                  {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                  {/* eslint-enable */}
                  {children}
                </SubBackground>
              </StyledDialogContent>
            </StyledDialogOverlay>
          )
      )}
    </>
  )
}
