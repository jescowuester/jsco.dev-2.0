import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Wave from "../components/wave"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Wave />
  </Layout>
)

export default IndexPage
