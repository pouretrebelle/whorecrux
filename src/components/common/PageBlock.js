import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const AsComponent = ({ as, ...props }) => {
  const Element = as || "div"
  return <Element {...props} />
}

const PageBlock = styled(AsComponent)`
  margin: 3rem auto;
  box-sizing: border-box;
  padding: 0 1rem 0 7rem;
  width: 100%;
  position: relative;
  overflow: visible;
  max-width: 40rem;

  @media (max-width: 40rem) {
    ${(props) => props.top && "padding-left: 1rem;"}
  }
`

PageBlock.PropTypes = {
  top: PropTypes.bool,
}

export default PageBlock
