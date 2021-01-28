import SelectPropertySubtype from "./SelectPropertySubtype";
import SelectPropertyType from "./SelectPropertyType";
import SelectAddress from "./SelectAddress";
import SelectStreet from "./SelectStreet";
import SelectLandmark from "./SelectLandmark";
import SelectPincode from "./SelectPincode";
import SelectTankSize from "./SelectTankSize";
import SelectPitType from "./SelectPitType";

export const config = {
  routes: {
    "property-type": {
      component: SelectPropertyType,
      texts: {
        headerCaption: "",
        header: "CS_FILE_PROPERTY_PLACEHOLDER",
        cardText: "CS_FILE_PROPERTY_TEXT",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "property-subtype",
    },
    "property-subtype": {
      component: SelectPropertySubtype,
      texts: {
        headerCaption: "",
        header: "CS_FILE_PROPERTY_SUBTYPE_PLACEHOLDER",
        cardText: "CS_FILE_PROPERTY_SUBTYPE_TEXT",
        submitBarLabel: "PT_COMMONS_NEXT",
      },
      nextStep: "pincode",
    },
    pincode: {
      component: SelectPincode,
      texts: {
        headerCaption: "",
        header: "CS_ADDCOMPLAINT_PINCODE",
        cardText: "CS_FILE_PROPERTY_PINCODE_TEXT",
        nextText: "PT_COMMONS_NEXT",
        skipText: "CORE_COMMON_SKIP_CONTINUE",
      },
      inputs: [
        {
          label: "CORE_COMMON_PINCODE",
          type: "text",
          name: "pincode",
          validation: {
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
        headerCaption: "CS_ADDCOMPLAINT_PROPERTY_LOCATION",
        header: "CS_ADDCOMPLAINT_PROVIDE_PROPERTY_ADDRESS",
        cardText: "CS_ADDCOMPLAINT_PROPERTY_CITY_MOHALLA_TEXT",
        nextText: "PT_COMMONS_NEXT",
      },
      nextStep: "street",
    },
    street: {
      component: SelectStreet,
      texts: {
        headerCaption: "CS_ADDCOMPLAINT_PROPERTY_LOCATION",
        header: "CS_ADDCOMPLAINT_PROVIDE_PROPERTY_ADDRESS",
        cardText: "CS_ADDCOMPLAINT_PROVIDE_PROPERTY_STREET_DOOR_NO",
        nextText: "PT_COMMONS_NEXT",
        skipText: "CORE_COMMON_SKIP_CONTINUE",
      },
      inputs: [
        {
          label: "CS_ADDCOMPLAINT_PROPERTY_STREET",
          type: "text",
          name: "street",
        },
        {
          label: "CS_ADDCOMPLAINT_PROPERTY_DOOR_NO",
          type: "text",
          name: "doorNo",
        },
      ],
      nextStep: "landmark",
    },
    landmark: {
      component: SelectLandmark,
      texts: {
        headerCaption: "CS_ADDCOMPLAINT_PROPERTY_LOCATION",
        header: "CS_ADDCOMPLAINT_PROVIDE_LANDMARK",
        cardText: "CS_ADDCOMPLAINT_PROVIDE_PROPERTY_LANDMARK_TEXT",
        nextText: "PT_COMMONS_NEXT",
        skipText: "CORE_COMMON_SKIP_CONTINUE",
      },
      inputs: [
        {
          label: "CS_ADDCOMPLAINT_PROPERTY_LANDMARK",
          type: "textarea",
          name: "landmark",
        },
      ],
      nextStep: "pit-type",
    },
    "pit-type": {
      component: SelectPitType,
      texts: {
        header: "CS_FILE_PROPERTY_PIT_TYPE",
        cardText: "CS_FILE_PROPERTY_PIT_TYPE_TEXT",
        nextText: "PT_COMMONS_NEXT",
      },
      nextStep: "tank-size",
    },
    "tank-size": {
      component: SelectTankSize,
      texts: {
        headerCaption: "",
        header: "CS_FILE_PROPERTY_TANKSIZE_PLACEHOLDER",
        cardText: "CS_FILE_PROPERTY_TANKSIZE_TEXT",
        nextText: "PT_COMMONS_NEXT",
      },
      nextStep: null,
    },
  },
  indexRoute: "property-type",
};
