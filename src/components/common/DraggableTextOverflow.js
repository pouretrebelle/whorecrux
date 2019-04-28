import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const THRESHOLD = 2
const ELLIPSIS_WIDTH = 12

const Wrapper = styled.div`
  position: relative;
  height: 1.15em;
  display: flex;
  ${(props) => props.scrollable && "cursor: col-resize;"}
`

const Ellipses = styled.div`
  flex: 0 0 12px;
  text-align: center;

  &:before {
    content: "\\2026";
  }
`

const Content = styled.div`
  flex: 1 0 0;
  overflow-y: hidden;
  overflow-x: scroll;
  width: 100%;
  height: 1.5em;
  white-space: nowrap;
  user-select: none;
  scrollbar-color: transparent transparent;
  scrollbar-width: 0;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &::-moz-scrollbar {
    display: none;
  }

  ${(props) => props.nativeEllipses && "text-overflow: ellipsis;"}
`

class DraggableTextOverflow extends Component {
  wrapperElement = undefined
  contentElement = undefined

  constructor(props) {
    super(props)
    this.state = {
      initialised: false,
      pageX: undefined,
      scrollWidth: undefined,
      clientWidth: undefined,
      scrollLeft: 0,
    }
  }

  getCanScroll() {
    return this.state.scrollWidth > this.state.clientWidth
  }

  getMoreLeft() {
    return (
      this.state.initialised &&
      this.getCanScroll() &&
      this.state.scrollLeft > THRESHOLD &&
      this.state.scrollWidth > this.state.clientWidth + ELLIPSIS_WIDTH * 2 // so there's space for two ellipses
    )
  }

  getMoreRight() {
    return (
      this.state.initialised &&
      this.getCanScroll() &&
      this.state.scrollLeft + this.state.clientWidth + THRESHOLD <
        this.state.scrollWidth &&
      this.state.scrollLeft > THRESHOLD // otherwise native ellipsis is shown
    )
  }

  componentDidMount() {
    this.calculateDimensions()
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.onMouseMoved)
  }

  onMousePressed = (e) => {
    if (!this.getCanScroll()) return
    this.setState({ pageX: e.pageX })
    window.addEventListener("mousemove", this.onMouseMoved)
    window.addEventListener("mouseup", this.onMouseReleased)
  }

  onMouseReleased = () => {
    window.removeEventListener("mousemove", this.onMouseMoved)
    window.removeEventListener("mouseup", this.onMouseReleased)
  }

  onMouseMoved = (e) => {
    e.preventDefault() // stop scrolling
    const event = e.touches ? e.touches[0] : e
    this.setScroll(this.state.scrollLeft + this.state.pageX - event.pageX)
    this.setState({ pageX: event.pageX })
  }

  onScrolled = ({ target }) => {
    this.setScroll(target.scrollLeft)
  }

  calculateDimensions = () => {
    this.setState({
      scrollWidth: this.contentElement.scrollWidth,
      clientWidth: this.wrapperElement.clientWidth,
      scrollLeft: this.contentElement.scrollLeft,
      initialised: true,
    })
  }

  setScroll = (scrollLeft) => {
    // we have to tweak the values when scrolling near the left
    // to compensate for the ellpisis shifting the content

    // over left threshold
    if (!this.getMoreLeft() && scrollLeft > THRESHOLD) {
      scrollLeft += ELLIPSIS_WIDTH
    }
    // inside left threshold
    else if (this.getMoreLeft() && scrollLeft <= THRESHOLD + ELLIPSIS_WIDTH) {
      scrollLeft -= ELLIPSIS_WIDTH
    }

    this.contentElement.scrollLeft = scrollLeft
    this.setState({ scrollLeft })
  }

  render() {
    const { children, ...props } = this.props
    const { initialised, scrollLeft } = this.state

    return (
      <Wrapper
        scrollable={this.getCanScroll()}
        ref={(element) => (this.wrapperElement = element)}
        {...props}
      >
        {this.getMoreLeft() && <Ellipses />}
        <Content
          nativeEllipses={!initialised || scrollLeft <= THRESHOLD}
          ref={(element) => (this.contentElement = element)}
          onScroll={this.onScrolled}
          onMouseEnter={this.calculateDimensions}
          onTouchStart={this.calculateDimensions}
          onMouseDown={this.onMousePressed}
        >
          {children}
        </Content>
        {this.getMoreRight() && <Ellipses />}
      </Wrapper>
    )
  }
}

DraggableTextOverflow.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DraggableTextOverflow
