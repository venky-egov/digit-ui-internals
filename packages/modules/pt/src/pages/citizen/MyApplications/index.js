import { Header, Loader } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MyApplication from "./my-application";

export const MyApplications = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const { isLoading, isError, error, data } = Digit.Hooks.pt.usePropertySearch({ tenantId });

  if (isLoading) {
    return <Loader />;
  }

  const { Properties: applicationsList } = data || {};

  return (
    <React.Fragment>
      <Header>{t("CS_TITLE_MY_APPLICATIONS")}</Header>
      {applicationsList?.length > 0 &&
        applicationsList.map((application, index) => (
          <div key={index}>
            <MyApplication application={application} />
          </div>
        ))}
      {!applicationsList?.length > 0 && <p style={{ marginLeft: "16px", marginTop: "16px" }}>{t("PT_NO_APPLICATION_FOUND_MSG")}</p>}
      <p style={{ marginLeft: "16px", marginTop: "16px" }}>
        {t("PT_TEXT_NOT_ABLE_TO_FIND_THE_APPLICATION")}{" "}
        <span className="link">
          <Link to="/digit-ui/citizen/pt/property/new-application/info">{t("PT_COMMON_CLICK_HERE")}</Link>
        </span>
      </p>
    </React.Fragment>
  );
};
