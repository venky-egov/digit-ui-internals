import { Header, HomeLink } from "@egovernments/digit-ui-react-components";
import React from "react";

import { useTranslation } from "react-i18next";

export const PTModule = () => {
  const moduleCode = "PT";
  console.log(moduleCode, "module integrated");
};

export const PTLinks = ({ matchPath }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {/* TODO: change */}
      <Header>{t("CS_HOME_QUICK_PAY")}</Header>
      <HomeLink to={`${matchPath}/property-tax`}>{t("CS_HOME_PT")}</HomeLink>
      <HomeLink to={`${matchPath}/tl-renewal`}>{t("CS_HOME_TRADE_LICENCE_RENEWAL")}</HomeLink>
      <HomeLink to={`${matchPath}/water-bill`}>{t("CS_HOME_WATER_BILL")}</HomeLink>
    </React.Fragment>
  );
};
