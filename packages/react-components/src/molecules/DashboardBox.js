import React from "react";
import { Link } from "react-router-dom";

const DashboardBox = ({ svgIcon, header, info, subHeader, links }) => {
  return (
    <div className="employeeCard card-home" style={{ width: "270px" }}>
      <div className="complaint-links-container">
        <div className="header">
          <span className="logo">
            {/* <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"
                fill="white"
              ></path>
            </svg> */}
            {svgIcon}
          </span>
          <span className="text">{header}</span>
        </div>
        <div className="body" style={{ marginLeft: 0 }}>
          <div className="employeeCard-info-box" style={{ display: "flex", justifyContent: "flex-end" }}>
            {Object.keys(info).map((key, index) => {
              return (
                <div key={index} style={{ display: "flex", flexDirection: "column" }}>
                  <span>{info[key]}</span>
                  <span>{key}</span>
                </div>
              );
            })}
          </div>
          <hr style={{ borderColor: "#e7e6e6", width: "100%", marginRight: "auto", marginLeft: "auto" }} />
          <div className="employeeCard-footer">
            {links.map((link, index) => (
              <Link to={link.pathname}>{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBox;
