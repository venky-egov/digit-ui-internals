import SelectOwnerAddress from "./Steps/SelectOwnerAddress";
import SelectOwnerDetails from "./Steps/SelectOwnerDetails";
import SelectSpecialProofIdentityImages from "./Steps/SelectSpecialProofIdentityImages";
import SelectProofIdentityImages from "./Steps/SelectProofIdentityImages";
import SelectSpecialOwnerCategoryType from "./Steps/SelectSpecialOwnerCategoryType";
import SelectOwnerShipDetails from "./Steps/SelectOwnerShipDetails";
import SelectInistitutionOwnerDetails from "./Steps/SelectInistitutionOwnerDetails";
import SelectGeolocation from "./Steps/SelectGeolocation";
import SelectPincode from "./Steps/SelectPincode";
import SelectAddress from "./Steps/SelectAddress";
import SelectStreet from "./Steps/SelectStreet";
import SelectLandmark from "./Steps/SelectLandmark";

export const config = {
  routes: {
    "map": {
      component: SelectGeolocation,
      nextStep: "pincode",
    },
    pincode: {
      component: SelectPincode,
      texts: {
        headerCaption: "Property's Location",
        header: "Do you know the pincode?",
        cardText:
          "if you know the pincode of the property address, provide below. It will help us identify the property location easily or you can skip and continue.",
        nextText: "Next",
        skipText: "Skip and Continue",
      },
      inputs: [
        {
          label: "CORE_COMMON_PINCODE",
          type: "text",
          name: "pincode",
          validation: {
            pattern: /^([1-9])(\d{5})$/,
            minLength: 6,
            maxLength: 7,
          },
          error: "CORE_COMMON_PINCODE_INVALID",
        },
      ],
      nextStep: "address",
    },
    address: {
      component: SelectAddress,
      texts: {
        headerCaption: "Property's Location",
        header: "Provide Property Address",
        cardText: "Choose the locality of the property from the list given below",
        nextText: "Next",
      },
      nextStep: "street",
    },
    street: {
      component: SelectStreet,
      texts: {
        headerCaption: "Property's Location",
        header: "Provide Property Address",
        cardText: "Enter your street name",
        nextText: "Next",
      },
      inputs: [
        {
          label: "Street Name",
          type: "text",
          name: "street",
          validation: {
            pattern: /^[\w\s]{1,256}$/,
          },
          error: "CORE_COMMON_STREET_INVALID",
        },
        {
          label: "Door Number",
          type: "text",
          name: "doorNo",
          validation: {
            pattern: /^[\w]([\w\/,\s])*$/,
          },
          error: "CORE_COMMON_DOOR_INVALID",
        },
      ],
      nextStep: "landmark",
    },
    landmark: {
      component: SelectLandmark,
      texts: {
        headerCaption: "Property's Location",
        header: "Provide Landmark",
        cardText: "Provide the landmarkto help us reach the property's location easily.",
        nextText: "Next",
        skipText: "Skip and Coninue",
      },
      inputs: [
        {
          label: "CS_FILE_APPLICATION_PROPERTY_LOCATION_LANDMARK_LABEL",
          type: "textarea",
          name: "landmark",
          validation: {
            maxLength: 1024,
          },
        },
      ],
      nextStep: "owner-ship-details",
    },
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
  indexRoute: "map",
};
