import Card from "../atoms/Card";
import React from "react";

const ComplaintsLink = ({ links }) => {
  console.log("find config links here", links);

  const userLinks = links?.filter((link) => {
    if (link.accessTo) {
      if (Digit.UserService.hasAccess(link.accessTo)) {
        return true;
      }
    } else {
      return true;
    }
  });

  const GetLogo = () => (
    <div className="header">
      <span className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" fill="white" />
        </svg>
      </span>{" "}
      <span className="text">Complaints</span>
    </div>
  );

  return (
    <Card style={{ paddingRight: 0, marginTop: 0 }} className="employeeCard filter">
      <div className="complaint-links-container">
        {GetLogo()}
        <div className="body">
          {userLinks?.map(({ link, text }, index) => (
            <span className="link" key={index}>
              <a href={link}>{text}</a>
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ComplaintsLink;
