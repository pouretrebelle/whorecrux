import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const getLengthType = (words) => {
  if (words < 1000) return "drabble"
  if (words < 5000) return "ficlet"
  if (words < 20000) return "novelette"
  if (words < 50000) return "novella"
  if (words < 400000) return "novel"
  return "epic"
}

const getLengthColor = (words) => {
  const type = getLengthType(words)
  if (type === "drabble") return "#aff3f2"
  if (type === "ficlet") return "#87dfd2"
  if (type === "novelette") return "#54c6a8"
  if (type === "novella") return "#32b187"
  if (type === "novel") return "#1b9f68"
  if (words < 20000) return "#0a8249"
  if (words < 30000) return "#eefff7"
  if (words < 40000) return "#086539"
  if (words < 50000) return "#075731"
  if (words < 60000) return "#064929"
  if (words < 70000) return "#043b21"
  if (words < 80000) return "#032d19"
  if (words < 90000) return "#021e11"
  if (words < 100000) return "#011009"
  return "#000210"
}

const Wrapper = styled.div`
  height: 0.25rem;
  margin: 0 0 1rem;
  background: ${(props) => props.theme.grey};
`

const StyledLengthBar = styled.div`
  width: ${(props) => {
    console.log(props)
    return Math.min(100, props.wordCount / 1000)
  }}%;
  height: 100%;
  background: ${(props) => getLengthColor(props.wordCount)};
`

const LengthBar = (props) => (
  <Wrapper>
    <StyledLengthBar {...props} />
  </Wrapper>
)

LengthBar.propTypes = {
  wordCount: PropTypes.number.isRequired,
}

export default LengthBar
