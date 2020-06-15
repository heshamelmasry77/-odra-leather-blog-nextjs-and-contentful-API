import React from "react";
import styled from "styled-components";

const CustomFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: black;
  .footer-logo {
  height: 34px;
  }
`;

export const Footer = () => {
  return (
    <CustomFooter>
      <div className="container">
        <span className="text-white">
          Copyright
          &#169;
          {`${new Date().getFullYear()} Odra Leather.`}
        </span>
        <div className="float-right">
          <a
            href="https://www.odraleather.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="footer-logo" src="/logo-white.png" alt="Odra Leather Logo"/>
          </a>
        </div>
      </div>
    </CustomFooter>
  );
};

Footer.displayName = "Footer";
