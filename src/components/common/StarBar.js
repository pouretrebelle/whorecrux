import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Wrapper = styled.div`
  position: relative;
  width: 2rem;
  height: 10.5rem;
  background: ${(props) => props.theme.grey};
  margin: 0 0.5rem 0 0;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMSI+PGcgZmlsbD0iI0ZGRiI+PHBhdGggZD0iTTEyLjM2IDBsLS4wMTggOC4wMzRMMTkuOTUgMTAuNWwtNy42MDggMi40NjYuMDE3IDguMDM0SDIwVjB6Ii8+PHBhdGggZD0iTS4wNzggMTYuOTg4TDQuNzkxIDEwLjUuMDc4IDQuMDFsNy41OTggMi41TDEyLjM2IDBIMHYyMWgxMi4zNTlsLTQuNjgzLTYuNTA5eiIvPjwvZz48L3N2Zz4=);
    background-size: contain;
  }
`

const StyledStarBar = styled.div`
  height: ${(props) => props.rating}%;
  background-size: 20px 105px;
  background-image: ${(props) =>
    props.primary
      ? "linear-gradient(to bottom, #aaaaaa, #000000)"
      : "linear-gradient(to bottom, #ffe3d9, #ff678b)"};
`

const StarBar = (props) => (
  <Wrapper>
    <StyledStarBar {...props} />
  </Wrapper>
)

StarBar.propTypes = {
  rating: PropTypes.number.isRequired,
  primary: PropTypes.bool,
}

export default StarBar
