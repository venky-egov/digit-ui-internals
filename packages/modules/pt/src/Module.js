import React, { useMemo, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch, useRouteMatch, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BackButton, Header, HomeLink, Loader, PrivateRoute } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

import CitizenApp from "./pages/citizen";
import PTSelectPincode from "./pageComponents/PTSelectPincode";
import PTSelectAddress from "./pageComponents/PTSelectAddress";
import Proof from "./pageComponents/Proof";
import SelectOwnerShipDetails from "./pageComponents/SelectOwnerShipDetails";
import SelectOwnerDetails from "./pageComponents/SelectOwnerDetails";
import SelectSpecialOwnerCategoryType from "./pageComponents/SelectSpecialOwnerCategoryType";
import SelectOwnerAddress from "./pageComponents/SelectOwnerAddress";
import SelectInistitutionOwnerDetails from "./pageComponents/SelectInistitutionOwnerDetails";
import SelectProofIdentity from "./pageComponents/SelectProofIdentity";
import SelectSpecialProofIdentity from "./pageComponents/SelectSpecialProofIdentity";
import PropertyTax from "./pageComponents/PropertyTax";
import PTSelectGeolocation from "./pageComponents/PTSelectGeolocation";
import IsResidential from "./pageComponents/IsResidential";
import PropertyType from "./pageComponents/PropertyType";
import PropertyUsageType from "./pageComponents/PropertyUsageType";
import GroundFloorDetails from "./pageComponents/GroundFloorDetails";
import PropertyFloorDetails from "./pageComponents/PropertyFloorDetails";
import PropertyBasementDetails from "./pageComponents/PropertyBasementDetails";

import IsThisFloorSelfOccupied from "./pageComponents/IsThisFloorSelfOccupied";
import ProvideSubUsageType from "./pageComponents/ProvideSubUsageType";
import RentalDetails from "./pageComponents/RentalDetails";
import ProvideSubUsageTypeOfRentedArea from "./pageComponents/ProvideSubUsageTypeOfRentedArea";
import IsAnyPartOfThisFloorUnOccupied from "./pageComponents/IsAnyPartOfThisFloorUnOccupied";
import UnOccupiedArea from "./pageComponents/UnOccupiedArea";
import Area from "./pageComponents/Area";

const componentsToRegister = {
  PropertyTax,
  PTSelectPincode,
  PTSelectAddress,
  Proof,
  SelectOwnerShipDetails,
  SelectOwnerDetails,
  SelectSpecialOwnerCategoryType,
  SelectOwnerAddress,
  SelectInistitutionOwnerDetails,
  SelectProofIdentity,
  SelectSpecialProofIdentity,
  PTSelectGeolocation,

  IsThisFloorSelfOccupied,
  ProvideSubUsageType,
  RentalDetails,
  ProvideSubUsageTypeOfRentedArea,
  IsAnyPartOfThisFloorUnOccupied,
  UnOccupiedArea,
  Area,
  IsResidential,
  PropertyType,
  PropertyUsageType,
  GroundFloorDetails,
  PropertyFloorDetails,
  PropertyBasementDetails,
};

const addComponentsToRegistry = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};

export const PTModule = ({ userType, tenants }) => {
  const moduleCode = "PT";
  addComponentsToRegistry();
  console.log(moduleCode, "module integrated");

  Digit.SessionStorage.set("PT_TENANTS", tenants);
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
        <HomeLink to={`${matchPath}/property/my-properties`}>{t("PT_MY_PROPERTIES")}</HomeLink>
        <HomeLink to={`${matchPath}/property/my-applications`}>{t("PT_MY_APPLICATION")}</HomeLink>
      </div>
    </React.Fragment>
  );
};
