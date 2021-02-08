import React, { useState, useEffect } from "react";
import { Header } from "@egovernments/digit-ui-react-components";
import MyBill from "./my-bill";
import { useTranslation } from "react-i18next";

export const BillListPT = ({ billsList }) => {
  const { t } = useTranslation();

  const propertyList = billsList.map((e) => ({
    ...e,
    propertId: "123",
    ownerName: "don joe",
    propertyAddress: "sadjhh askdhjad jashdk",
    dueDate: new Date().toLocaleDateString(),
  }));

  return (
    <React.Fragment>
      <Header>{t("CS_TITLE_MY_BILLS")}</Header>
      {propertyList?.length > 0 &&
        propertyList.map((bill, index) => (
          <div key={index}>
            <MyBill {...{ bill }} />
          </div>
        ))}
    </React.Fragment>
  );
};
