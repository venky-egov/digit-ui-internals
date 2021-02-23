import SelectOwnerAddress from "./Steps/SelectOwnerAddress";
import SelectOwnerDetails from "./Steps/SelectOwnerDetails";
import SelectSpecialProofIdentityImages from "./Steps/SelectSpecialProofIdentityImages";
import SelectProofIdentityImages from "./Steps/SelectProofIdentityImages";
import SelectSpecialOwnerCategoryType from "./Steps/SelectSpecialOwnerCategoryType";
import SelectOwnerShipDetails from "./Steps/SelectOwnerShipDetails";
import SelectInistitutionOwnerDetails from "./Steps/SelectInistitutionOwnerDetails";

export const config = {
  routes: {
    "owner-ship-details": {
      component: SelectOwnerShipDetails,
      texts: {
        headerCaption: "Property's Ownership",
        header: "Provide Ownership details",
        cardText: "Choose the type of ownership of the property from the options given below",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: {
        "Individual / Single Owner": "owner-details",
        "Joint / Multiple Owners": "owner-details",
        "Institutional - Private": "inistitution-details",
        "Institutional - Private": "inistitution-details",
        // "INSTITUTIONALPRIVATE": "inistitution-details",
        // "INSTITUTIONALGOVERNMENT": "inistitution-details",
        // "INDIVIDUAL": "owner-details"
      },
    },
    "owner-details": {
      component: SelectOwnerDetails,
      texts: {
        headerCaption: "",
        header: "CS_OWNER_DETAILS_PLACEHOLDER",
        cardText: "",
        nextText: "PT_COMMONS_NEXT",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "special-owner-category",
    },
    "special-owner-category": {
      component: SelectSpecialOwnerCategoryType,
      texts: {
        headerCaption: "CS_SPECIAL_OWNER_DETAILS_PLACEHOLDER",
        header: "CS_SPECIAL_OWNER_CATEGORY_PLACEHOLDER",
        cardText: "CS_SPECIAL_OWNER_CATEGORY_TEXT",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "owner-address",
    },
    "owner-address": {
      component: SelectOwnerAddress,
      texts: {
        headerCaption: "CS_SPECIAL_OWNER_DETAILS_PLACEHOLDER",
        header: "CS_OWNER_ADDRESS_LABEL",
        cardText: "",
        nextText: "PT_COMMONS_NEXT",
      },
      nextStep: "proof-of-identity",
    },
    "proof-of-identity": {
      component: SelectProofIdentityImages,
      texts: {
        headerCaption: "CS_ADDCOMPLAINT_COMPLAINT_LOCATION",
        header: "CS_ADDCOMPLAINT_PROVIDE_COMPLAINT_ADDRESS",
        cardText: "CS_ADDCOMPLAINT_CITY_MOHALLA_TEXT",
        nextText: "PT_COMMONS_NEXT",
      },
      nextStep: "special-owner-category-proof",
    },
    "special-owner-category-proof": {
      component: SelectSpecialProofIdentityImages,
      texts: {
        headerCaption: "CS_ADDCOMPLAINT_COMPLAINT_LOCATION",
        header: "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TITLE",
        cardText: "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TITLE_TEXT",
        nextText: "PT_COMMONS_NEXT",
      },
      nextStep: "null",
    },
    "inistitution-details": {
      component: SelectInistitutionOwnerDetails,
      texts: {
        headerCaption: "CS_ADDCOMPLAINT_COMPLAINT_LOCATION",
        header: "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TITLE",
        cardText: "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TITLE_TEXT",
        nextText: "PT_COMMONS_NEXT",
      },
      nextStep: "owner-ship-details",
    },
  },
  indexRoute: "owner-ship-details",
};
