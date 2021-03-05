import { Card } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ApplicationLinks = ({ isMobile, data, setPopup, setType, setSearchFields }) => {
  const { t } = useTranslation();

  const allLinks = [
    {
      text: t("ES_TITLE_NEW_DESULDGING_APPLICATION"),
      link: "/digit-ui/employee/fsm/new-application",
      accessTo: ["FSM_CREATOR_EMP"],
    },
    // { text: t("ES_TITLE_REPORTS"), link: "/employee" },
    // { text: t("ES_TITLE_DASHBOARD"), link: "/employee" },
    {
      text: t("ES_TITILE_SEARCH_APPLICATION"),
      link: "/digit-ui/employee/fsm/search",
    },
  ];

  const [links, setLinks] = useState([]);

  const { roles } = Digit.UserService.getUser().info;

  const hasAccess = (accessTo) => {
    return roles.filter((role) => accessTo.includes(role.code)).length;
  };

  useEffect(() => {
    let linksToShow = [];
    allLinks.forEach((link) => {
      if (link.accessTo) {
        if (hasAccess(link.accessTo)) {
          linksToShow.push(link);
        }
      } else {
        linksToShow.push(link);
      }
    });
    setLinks(linksToShow);
  }, []);

  // useEffect(() => {
  //   if (isMobile) {
  //     const mobileLinks = links.filter((link) => {
  //       return link.text !== t("ES_TITLE_DASHBOARD");
  //     });
  //     setLinks(mobileLinks);
  //   }
  // }, []);

  const GetLogo = () => (
    <div className="header">
      <span className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" fill="white" />
        </svg>
      </span>{" "}
      <span className="text">Applications</span>
    </div>
  );

  const searchApplicationSearchFields = [
    {
      label: t("ES_SEARCH_APPLICATION_APPLICATION_NO"),
      name: "applicationNos",
    },
    {
      label: t("ES_SEARCH_APPLICATION_MOBILE_NO"),
      name: "mobileNumber",
    },
    {
      label: t("ES_SEARCH_FROM_DATE"),
      name: "fromDate",
      type: "date",
    },
    {
      label: t("ES_SEARCH_TO_DATE"),
      name: "toDate",
      type: "date",
    },
  ];

  return (
    <Card className="employeeCard filter">
      <div className="complaint-links-container">
        {GetLogo()}
        <div className="body">
          {links.map(({ link, text }, index) => (
            <span
              className="link"
              key={index}
              onClick={() => {
                if (isMobile) {
                  setPopup(true);
                  setSearchFields(searchApplicationSearchFields);
                  setType("SEARCH");
                }
              }}
            >
              <Link to={link}>{text}</Link>
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ApplicationLinks;
