import React, { useMemo, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch, useRouteMatch, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BackButton, Header, HomeLink, Loader, PrivateRoute } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

import CitizenApp from "./pages/citizen";
import SelectGeolocation from "./pageComponents/SelectGeolocation";
import SelectPincode from "./pageComponents/SelectPincode";
import SelectAddress from "./pageComponents/SelectAddress";
import SelectLandmark from "./pageComponents/SelectLandmark";
import SelectStreet from "./pageComponents/SelectStreet";
import Proof from "./pageComponents/Proof";
import SelectOwnerShipDetails from "./pageComponents/SelectOwnerShipDetails";
import SelectOwnerDetails from "./pageComponents/SelectOwnerDetails";
import SelectSpecialOwnerCategoryType from "./pageComponents/SelectSpecialOwnerCategoryType";
import SelectOwnerAddress from "./pageComponents/SelectOwnerAddress";
import SelectInistitutionOwnerDetails from "./pageComponents/SelectInistitutionOwnerDetails";
import SelectProofIdentity from "./pageComponents/SelectProofIdentity";
import SelectSpecialProofIdentity from "./pageComponents/SelectSpecialProofIdentity";
import PropertyTax from "./pageComponents/PropertyTax";

const componentsToRegister = {
  PropertyTax,
  SelectGeolocation,
  SelectPincode,
  SelectAddress,
  SelectStreet,
  Proof,
  SelectLandmark,
  SelectOwnerShipDetails,
  SelectOwnerDetails,
  SelectSpecialOwnerCategoryType,
  SelectOwnerAddress,
  SelectInistitutionOwnerDetails,
  SelectProofIdentity,
  SelectSpecialProofIdentity,
};

const addComponentsToRegistry = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};

export const PTModule = ({ userType }) => {
  const moduleCode = "PT";
  addComponentsToRegistry();
  console.log(moduleCode, "module integrated");

  if (userType === "citizen") {
    return <CitizenApp />;
  } else {
    return null;
  }
};

export const PTLinks = ({ matchPath, userType }) => {
  const { t } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("FSM_CITIZEN_FILE_PROPERTY", {});

  useEffect(() => {
    clearParams();
  }, []);

  return (
    <React.Fragment>
      <Header>{t("ACTION_TEST_PROPERTY_TAX")}</Header>
      <div className="d-grid">
        <HomeLink to={`${matchPath}/property/new-application`}>{t("PT_CREATE_PROPERTY ")}</HomeLink>
      </div>
    </React.Fragment>
  );
};
