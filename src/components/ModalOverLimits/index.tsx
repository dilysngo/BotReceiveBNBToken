import { Currency } from '@pancakeswap-libs/sdk'
import React, { useCallback, useEffect, useState } from 'react'
import styled from "styled-components"
import { Button, Text } from 'claim-libs-uikit'
import Modal from '../Modal'

interface CurrencySearchModalProps {
  isOpen: boolean
  onDismiss: () => void,
  dataModal: { userInput: any }
}

const ModalContent = styled.div`
  width: 100%;
  text-align: center;
  padding: 50px 24px 30px; 

  .modal-header {
    img {
      width: 60px;
      height: auto; 
      margin-bottom: 20px;
    }
  }

  .modal-content {
    .box-amount {
      width: 100%;
      padding: 20px 12px;
      background-color: rgba(56, 179, 74, 0.5);
      border-radius: 12px;
      min-height: 100px;
      
      display: flex;
      flex-direction: column;
      justify-content: center;

      .countdown-item-number {
        font-family: Fredoka One;
        color: #fff;
        font-size: 44px;
      }
    }
  }
`
const CustomButton = styled(Button)`
  margin-top: 30px;
  border-radius: 9px;
  border: 3px solid #BF6A0F;

  &:hover {
    opacity: 1 !important;
  }
`
export default function CurrencySearchModal({
  isOpen,
  onDismiss,
  dataModal
}: CurrencySearchModalProps) {
  const { userInput } = dataModal;

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90} minHeight={50}>
      <ModalContent>
        <div className="modal-header">
          <img src="/images/icons/wanning.png" alt="" />
          <Text color="primary" fontSize="32px" fontWeight="600" mb="30px">
            Over the limits claim
          </Text>
        </div>
        <div className="modal-content">
          <div className="box-amount">
            <div className="countdown-item-number">{userInput.toFixed(3)}</div>
          </div>
        </div>
        <div className="modal-action">
          <CustomButton width="100%" onClick={onDismiss}>
            RETURN BACK
          </CustomButton>
        </div>
      </ModalContent>
    </Modal>
  )
}
