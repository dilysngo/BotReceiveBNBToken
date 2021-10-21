/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import 'assets/css/global.css'
import React, { Suspense, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Home from "pages/Home/index"
import Random from "pages/Random/index"
import { TranslationsContext } from '../hooks/TranslationsContext'
import { LanguageContext } from '../hooks/LanguageContext'
import Web3ReactManager from '../components/Web3ReactManager'
import Popups from '../components/Popups'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;

  img[alt='hot'] {
    position: relative;
  }

  div[title='Bunny'] {
    display: none;
  }
`
// Bg overview all page
const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;
`

const Marginer = styled.div` 
  margin-top: 0rem;
`

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, translatedLanguage, setTranslatedLanguage }}>
            <TranslationsContext.Provider value={{ translations, setTranslations }}>
              <BodyWrapper>
                <Popups />
                <Web3ReactManager>
                  <Switch>
                    <Route exact strict path="/" component={Home} />
                    <Route exact strict path="/random" component={Random} />
                  </Switch>
                </Web3ReactManager>
                <Marginer />
              </BodyWrapper>
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
