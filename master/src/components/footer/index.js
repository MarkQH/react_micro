import React from 'react';
import PropTypes from "prop-types";
import styled from'styled-components';

const FooterContainer = styled.div`
  height: 60px;
  background-color: #fff;
  color: #333;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Footer = (props) => {

  const { handleClick, title, isMarquee } = props;

  return (
    <FooterContainer>
      { title }
    </FooterContainer>
  )
};

Footer.defaultProps = {
  handleClick: () => {},
  title: "标题",
  isMarquee: false
};

Footer.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool
};

export default React.memo(Footer);
