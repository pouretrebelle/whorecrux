import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import PageBlock from "./common/PageBlock"
import LengthBar from "./common/LengthBar"
import StarBar from "./common/StarBar"
import TagBar from "./common/TagBar"

const Ratings = styled.div`
  position: absolute;
  left: 1rem;
  top: -1rem;
  display: flex;
`

const Comment = styled.div`
  color: #777;
`

const Review = ({
  title,
  author,
  link,
  summary,
  children,
  rating,
  smut,
  words,
  ...tags
}) => (
  <PageBlock>
    <Ratings>
      <StarBar rating={smut} />
      <StarBar rating={rating} primary />
    </Ratings>

    <LengthBar wordCount={words} />
    <h2>
      <a href={link}>{title}</a>
    </h2>
    <p>{summary}</p>
    <Comment>{children}</Comment>
    <TagBar tags={Object.assign({}, { author }, ...tags)} />
  </PageBlock>
)

Review.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Review
