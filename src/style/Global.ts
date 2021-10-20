import { createGlobalStyle } from 'styled-components'
// import bg from "../assets/images/background/bg.svg"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    // background-image: url(\${bg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
