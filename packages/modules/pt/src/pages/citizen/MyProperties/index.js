import { Card, Header, Loader, SubmitBar } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MyProperty from "./my-properties";

export const MyProperties = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const { isLoading, isError, error, data } = Digit.Hooks.pt.usePropertySearch({ tenantId });

  if (isLoading) {
    return <Loader />;
  }

  const { Properties: applicationsList } = data;

  return (
    <React.Fragment>
      <Header>{t("PT_MY_PROPERTIES_HEADER")}</Header>
      {applicationsList?.length > 0 &&
        applicationsList.map((application, index) => (
          <div key={index}>
            <MyProperty application={application} />
          </div>
        ))}
      <Card>
        <Link to={`/digit-ui/citizen/pt/property/new-application/info`}>
          <SubmitBar label={t("PT_ADD_NEW_PROPERTY")} />
        </Link>
      </Card>
    </React.Fragment>
  );
};
