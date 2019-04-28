import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import DraggableTextOverflow from "./DraggableTextOverflow"

const Wrapper = styled(DraggableTextOverflow)`
  font-size: 0.75rem;
`

const Tags = styled.dl`
  display: inline;
  text-transform: uppercase;

  > * {
    display: inline;
  }
`
const TagTitle = styled.dd`
  margin: 0 0.25em 0 0;
  color: #999;
`

const Tag = styled.dd`
  margin: 0 0.5em 0 0;
  color: #333;
`

const TagBar = ({ tags }) => (
  <Wrapper>
    <Tags>
      {Object.keys(tags).map((key) => {
        const value = tags[key]
        return (
          <>
            <TagTitle key={key}>{key}</TagTitle>
            <Tag key={`${key}-value`}>
              {value === "object" ? value.join("&") : value}
            </Tag>
          </>
        )
      })}
    </Tags>
  </Wrapper>
)

TagBar.propTypes = {
  tags: PropTypes.object,
}

export default TagBar
