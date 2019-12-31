import React from "react"
import { ThemeProvider } from "styled-components"

import GlobalStyle from "../styles/GlobalStyle"
import theme from "../styles/theme"

export default ({ element }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      {element}
    </>
  </ThemeProvider>
)
