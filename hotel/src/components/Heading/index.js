import React from "react";

// logo img
import cyfHotelLogo from "../../images/cyf-hotel-logo.png";

// Styles
import { Wrapper, Content, LogoImg } from "./Heading.styles";

const Heading = () => (
  <Wrapper>
    <Content>
      <LogoImg src={cyfHotelLogo} alt="cyf-hotel-logo" />
      CYF Hotel
    </Content>
  </Wrapper>
);

export default Heading;
