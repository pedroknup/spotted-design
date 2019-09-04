import React, { Component } from "react";
import "./navbar-ios.component.css";

export default NavbarIOS = ({
  backButtonCallback,
  title,
  backButton,
  hasActionButton
}) => {
  return (
    <div className="navbar">
      {backButton  && (
        <div
          onClick={() => {
            if (backButtonCallback) backButtonCallback();
          }}
          className="navbar-button"
        >
          <svg
            className="navbar-button-icon back"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
          </svg>
          <span>Back</span>
        </div>
      )}
      <div />
      <div className="navbar-title">{title}</div>

      {hasActionButton && (
        <div className="navbar-create-post">
          <svg
            className="navbar-button-icon"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 1000 1000"
          >
            <g>
              <path d="M979.3,152.5L847.5,20.7c-7.2-7.2-16.6-10.7-26-10.7c-9.4,0-18.8,3.5-26,10.7L285.6,530.6v183.8h183.8l509.9-510c7.2-7.2,10.7-16.6,10.7-26S986.5,159.6,979.3,152.5z M438.7,622.5h-61.2v-61.2l444-444l61.3,61.3L438.7,622.5z M882.8,469.4c-25.4,0-45.9,20.5-45.9,45.9v382.8h-735v-735h382.8c25.4,0,45.9-20.5,45.9-45.9c0-25.4-20.5-45.9-45.9-45.9H71.3C37.4,71.2,10,98.7,10,132.5v796.2c0,33.8,27.4,61.2,61.3,61.2h796.2c33.8,0,61.3-27.4,61.3-61.3V515.3C928.7,489.9,908.1,469.4,882.8,469.4z" />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
};
