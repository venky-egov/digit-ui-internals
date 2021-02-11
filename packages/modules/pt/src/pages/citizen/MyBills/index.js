import React from "react";
import { Header, Loader } from "@egovernments/digit-ui-react-components";
import MyBill from "./my-bill";
import { useTranslation } from "react-i18next";

export const MyBills = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { info: userInfo } = Digit.UserService.getUser();

  //   const { isLoading, isError, error, data } = Digit.Hooks.fsm.useSearch(tenantId, { uuid: userInfo.uuid, limit: 100 });

  const applicationsList = [
    {
      propertId: "123",
      ownerName: "don joe",
      propertyAddress: "sadjhh askdhjad jashdk",
      dueDate: new Date().toLocaleDateString(),
    },
    {
      propertId: "123",
      ownerName: "don joe",
      propertyAddress: "sadjhh askdhjad jashdk",
      dueDate: new Date().toLocaleDateString(),
    },
    {
      propertId: "123",
      ownerName: "don joe",
      propertyAddress: "sadjhh askdhjad jashdk",
      dueDate: new Date().toLocaleDateString(),
    },
  ];

  return (
    <React.Fragment>
      <Header>{t("CS_TITLE_MY_BILLS")}</Header>
      {applicationsList?.length > 0 &&
        applicationsList.map((application, index) => (
          <div key={index}>
            <MyBill {...{ application }} />
          </div>
        ))}
    </React.Fragment>
  );
};
