import { createGlobalStyle } from "styled-components"
import { preflight } from "./cssreset"

const GlobalStyle = createGlobalStyle`
  ${preflight}
`

export default GlobalStyle
