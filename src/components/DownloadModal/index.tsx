import React, { useState } from 'react'
import { Button, Text } from 'claim-libs-uikit'
import Modal from 'components/ModalCustom'
import styled from "styled-components" 
import ImgUp from "assets/images/updownload.png"
import DownloadFile from 'helpers/DownloadFileHelper'

const ModalWrapper = styled(Modal)`
  .ant-modal-header {
    display: none;
  }
`
const ModalBody = styled.div`
  text-align: center;
  img {
    margin-top: 15px;
  }
`

interface DownloadModalProps {
  visible: boolean
  onOke?: () => void | undefined
  onCancel?: () => void | undefined
}

type CSVData = string | null;

export default function CurrencySearchModal({
  visible, 
  onOke, 
  onCancel,
}: DownloadModalProps) {
  // const initialState: CSVData = null;
  // const [fetchedCSVData, setFetchedCSVData] = useState<CSVData>(initialState);

  // if (!fetchedCSVData) {
  //   fetch(`${process.env.PUBLIC_URL}/data/data.csv`)
  //     .then(res => res.text())
  //     .then(stringData => {
  //       console.log(stringData);
  //       setFetchedCSVData(stringData);
  //     });
  // }

  const downloadSampleFile = () => {
    DownloadFile('a,b', 'sample', 'csv')
      
    // const fileReader = new FileReader();
    // fileReader.onload = (e) => {
    //   console.log("fileReader", fileReader.result);
    // }
    // fileReader.readAsText('/assets/sample.csv', function(readStrim) {
    //   console.log("readStrim", readStrim);
    // })
  }

  return (
    <ModalWrapper 
      visible={visible}
      width={430}
      onOke={onOke}
      onCancel={onCancel}
      showHeader={false}
      footer={null}
    >
      <Text fontSize="24px" fontWeight="600" textAlign="center">
        Address Submit Form
      </Text>
      <ModalBody>
        <img src={ImgUp} alt="" width={130} />
        <Text style={{ cursor: 'pointer', textDecoration: 'underline' }}>
          Upload csv list address
        </Text>
        <Text onClick={downloadSampleFile} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
          Download Sample file here
        </Text>
        <Button width="100%" style={{ marginTop: '15px', borderRadius: '10px' }}>
          Select to upload file
        </Button>
      </ModalBody>
    </ModalWrapper>
  )
}
