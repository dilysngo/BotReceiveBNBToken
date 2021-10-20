import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark } from 'claim-libs-uikit'
import { lightColors, darkColors } from 'theme/colors'

const CACHE_KEY = 'IS_DARK'

export interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType>({ isDark: false, toggleTheme: () => null })

const ThemeContextProvider: React.FC = ({ children }) => {
  // const [isDark, setIsDark] = useState(() => {
  //   const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
  //   return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
  // })
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark((prevState: any) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  const mergeColor = isDark ? {
    ...dark,
    colors: darkColors
  } : {
    ...light,
    colors: lightColors 
  }
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={mergeColor}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
