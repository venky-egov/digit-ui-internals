import CheckPage from "./Steps/CheckPage";
import Proof from "./Steps/Proof";
import { PropertyTax } from "./Steps/PropertyTax";
import SelectAddress from "./Steps/SelectAddress";
import SelectGeolocation from "./Steps/SelectGeolocation";
import SelectInistitutionOwnerDetails from "./Steps/SelectInistitutionOwnerDetails";
import SelectLandmark from "./Steps/SelectLandmark";
import SelectOwnerAddress from "./Steps/SelectOwnerAddress";
import SelectOwnerDetails from "./Steps/SelectOwnerDetails";
import SelectOwnerShipDetails from "./Steps/SelectOwnerShipDetails";
import SelectPincode from "./Steps/SelectPincode";
import SelectProofIdentityImages from "./Steps/SelectProofIdentityImages";
import SelectSpecialOwnerCategoryType from "./Steps/SelectSpecialOwnerCategoryType";
import SelectSpecialProofIdentityImages from "./Steps/SelectSpecialProofIdentityImages";
import SelectStreet from "./Steps/SelectStreet";

export const config = {
  routes: {
    info: {
      component: PropertyTax,
      nextStep: "is-this-a-residential-property",
    },
    "is-this-a-residential-property": {
      component: IsResidentialType,
      texts: {
        headerCaption: "",
        header: "Is this a Residential Property ?",
        cardText: "Used as Residence by a Person or persons/Family. There are no commercial/industrial/institutional activities in this property",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "provide-usage-type",
    },
    "provide-usage-type": {
      component: PropertyUsagePurpose,
      texts: {
        headerCaption: "Property Usage Type",
        header: "Provide Usage Type",
        cardText: "choose the type of usage of the property from the options given below",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "type-of-property",
    },
    "type-of-property": {
      component: PropertyType,
      texts: {
        headerCaption: "",
        header: "Type of Property",
        cardText: "",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "number-of-floors",
    },
    "number-of-floors": {
      component: PropertyFloorsDetails,
      texts: {
        headerCaption: "",
        header: "Number of Floors",
        cardText: "choose no. of floors on the property excluding basement",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "number-of-basements",
    },
    "number-of-basements": {
      component: PropertyBasementsDetails,
      texts: {
        headerCaption: "",
        header: "Number of Basements",
        cardText: "",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "groundfloordetails",
    },
    groundfloordetails: {
      component: GroundFloorSize,
      texts: {
        headerCaption: "",
        header: "Ground Floor Details",
        cardText: "Enter Plot size and built up area on the ground floor.",
        submitBarLabel: "Next",
      },
      inputs: [
        {
          label: "Plot Size(sq.yd)",
          type: "text",
          name: "PlotSize",
          validation: {
            pattern: /^[\w\s]{1,256}$/,
          },
          error: "CORE_COMMON_PLOTSIZE_INVALID",
        },
        {
          label: "Door Number",
          type: "text",
          name: "BuiltUpArea",
          validation: {
            pattern: /^[\w]([\w\/,\s])*$/,
          },
          error: "CORE_COMMON_AREA_INVALID",
        },
      ],
      nextStep: "map",
    },
    map: {
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
        submitBarLabel: "PT_COMMONS_NEXT",
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
        submitBarLabel: "Next",
      },
      nextStep: "street",
    },
    street: {
      component: SelectStreet,
      texts: {
        headerCaption: "Property's Location",
        header: "Provide Property Address",
        cardText: "Enter your street name",
        submitBarLabel: "Next",
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
        submitBarLabel: "Next",
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
      nextStep: "proof",
    },
    proof: {
      component: Proof,
      texts: {
        headerCaption: "Property's Location",
        header: "Proof Of address",
        cardText: "Adhaar Card, Voter ID, Driving Licence File Type: jpg, PNG OR PDF (less than 2MB)",
        nextText: "PT_COMMONS_NEXT",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
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
      },
    },
    "owner-details": {
      component: SelectOwnerDetails,
      texts: {
        headerCaption: "",
        header: "Owner Details",
        cardText: "",
        nextText: "PT_COMMONS_NEXT",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "special-owner-category",
    },
    "special-owner-category": {
      component: SelectSpecialOwnerCategoryType,
      texts: {
        headerCaption: "Owner's Details",
        header: "Special Owner Category",
        cardText: "",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "owner-address",
    },
    "owner-address": {
      component: SelectOwnerAddress,
      texts: {
        headerCaption: "Owner's Details",
        header: "Owner's Address",
        cardText: "",
        nextText: "PT_COMMONS_NEXT",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "proof-of-identity",
    },
    "proof-of-identity": {
      component: SelectProofIdentityImages,
      texts: {
        headerCaption: "Owner's Details",
        header: "Proof Of Identity",
        cardText: "Adhaar Card, Voter ID, Driving Licence",
        nextText: "PT_COMMONS_NEXT",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "special-owner-category-proof",
    },
    "special-owner-category-proof": {
      component: SelectSpecialProofIdentityImages,
      texts: {
        headerCaption: "CS_ADDCOMPLAINT_COMPLAINT_LOCATION",
        header: "Specail Owner Category Proof",
        cardText: "",
        nextText: "PT_COMMONS_NEXT",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "check",
    },
    "inistitution-details": {
      component: SelectInistitutionOwnerDetails,
      texts: {
        headerCaption: "",
        header: "Owner Details",
        cardText: "",
        nextText: "PT_COMMONS_NEXT",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "inistitution-proof-of-identity",
    },
    "inistitution-proof-of-identity": {
      component: SelectProofIdentityImages,
      texts: {
        headerCaption: "Owner's Details",
        header: "Proof Of Identity",
        cardText: "Adhaar Card, Voter ID, Driving Licence",
        nextText: "PT_COMMONS_NEXT",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "check",
    },
    check: {
      component: CheckPage,
      nextStep: null,
    },
    /* response: {
      component: Response,
      nextStep: null,
    }, */
  },
  indexRoute: "info",
};
