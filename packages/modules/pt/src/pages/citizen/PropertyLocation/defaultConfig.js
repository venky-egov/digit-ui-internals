//import SelectPropertySubtype from "./SelectPropertySubtype";
//import SelectPropertyType from "./SelectPropertyType";
import SelectAddress from "./SelectAddress";
import SelectStreet from "./SelectStreet";
import SelectLandmark from "./SelectLandmark";
import SelectPincode from "./SelectPincode";
import SelectGeolocation from "./SelectGeolocation";
import Proof from "./Proof";
import { PropertyTax } from "./PropertyTax";

export const config = {
  routes: {
    information: {
      component: PropertyTax,
      texts: {},
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
      nextStep: null,
    },
  },
  proof: {
    component: Proof,
    nextStep: null,
  },
  indexRoute: "information",
};
