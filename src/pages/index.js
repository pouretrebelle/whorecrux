import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Review from "../components/Review"

const IndexPage = ({ data }) => {
  const reviews = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      {reviews.map(({ node }, i) => (
        <Review key={i} {...node.frontmatter}>
          <div dangerouslySetInnerHTML={{ __html: node.html }} />
        </Review>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            author
            link
            summary
            date(formatString: "DD MMMM, YYYY")
            words
            rating
            smut
            type
            world
            canon
            war
            features
            locations
            genres
            pov
          }
          html
        }
      }
    }
  }
`

export default IndexPage
