import { Header, Loader } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import MyApplication from "./my-application";

export const MyApplications = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const { isLoading, isError, error, data } = Digit.Hooks.pt.usePropertySearch({ tenantId });

  if (isLoading) {
    return <Loader />;
  }

  const { Properties: applicationsList } = data;

  return (
    <React.Fragment>
      <Header>{t("CS_TITLE_MY_APPLICATIONS")}</Header>
      {applicationsList?.length > 0 &&
        applicationsList.map((application, index) => (
          <div key={index}>
            <MyApplication application={application} />
          </div>
        ))}
    </React.Fragment>
  );
};
