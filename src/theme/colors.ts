import { Colors } from './types'

export const baseColors = {
  failure: '#ED4B9E',
  primary: '#763005',
  primaryBright: '#53DEE9',
  primaryDark: '#0098A1',
  secondary: '#7645D9',
  success: '#31D0AA',
  warning: '#FFB237',
}

export const brandColors = {
  binance: '#F0B90B',
}

export const lightColors: Colors = {
  ...baseColors,
  ...brandColors,
  background: '#FAF9FA',
  backgroundDisabled: '#E9EAEB',
  contrast: 'red',
  invertedContrast: 'fffff', // background card swap
  input: 'rgba(56, 179, 74, 0.5)',
  inputSecondary: '#d7caec',
  tertiary: '#EFF4F5',
  text: '#763005',
  textSubtle: '#F9AE2E',
  textLight: "#ffffff",
  textDark: "#090808",
  textDisabled: '#BDC2C4',
  borderColor: '#E9EAEB',
  card: '#FFFFFF',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)',
  },
}

export const darkColors: Colors = {
  ...baseColors,
  ...brandColors,
  secondary: '#9A6AFF',
  background: '#100C18',
  backgroundDisabled: '#3c3742',
  contrast: '#FFFFFF',
  invertedContrast: '#191326',
  input: 'rgba(56, 179, 74, 0.5)',
  inputSecondary: '#66578D',
  primaryDark: '#0098A1',
  tertiary: '#353547',
  text: '#763005',
  textSubtle: '#A28BD4',
  textLight: "#ffffff",
  textDark: "#000000",
  textDisabled: '#666171',
  borderColor: '#524B63',
  card: '#27262c',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)',
  },
}
