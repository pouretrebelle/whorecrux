import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import PageBlock from "./common/PageBlock"

const LinksList = styled.ul`
  display: inline-block;
`

const NavLinkNaked = (props) => <Link {...props} activeClassName="active" />

const NavLink = styled(NavLinkNaked)`
  display: inline-block;
  margin: 0 1rem 0 0;
  padding: 1rem 0;
  border-bottom: 0.25rem solid ${(props) => props.theme.grey};
  font-weight: ${(props) => (props.primary ? "700" : "400")};

  &:hover,
  &.active {
    border-bottom-color: ${(props) => props.theme.primary};
  }
`

const Header = ({ siteTitle }) => (
  <PageBlock top as="header">
    <LinksList>
      <NavLink primary to="/">
        {siteTitle}
      </NavLink>
      <NavLink to="/classification">Classification</NavLink>
      <NavLink to="/masterlist">Masterlist</NavLink>
    </LinksList>
  </PageBlock>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
