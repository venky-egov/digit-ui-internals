const fsmCustomizations = {
  field: [
    {
      name: "SLUM_NAME",
      section: "ES_NEW_APPLICATION_LOCATION_DETAILS",
      //not needed
      // position: 3,
      // component: "Dropdown",
      // TODO: Fetch slum data from MDMS from backend?
      mdms: {
        criteria: "SlumName",
        tenantId: "pb.amritsar",
        i18nKey: "CS_COMMON_SLUM_NAME_",
      },
    },
    {
      name: "PAYMENT_NO_OF_TRIPS",
      section: "CS_CHECK_PIT_SEPTIC_TANK_DETAILS",
      override: "true",
    },
    {
      name: "AMOUNT_PER_TRIP",
      section: "CS_CHECK_PIT_SEPTIC_TANK_DETAILS",
      override: "true",
    },
    {
      name: "PAYMENT_AMOUNT",
      section: "CS_CHECK_PIT_SEPTIC_TANK_DETAILS",
      override: "true",
    },
  ],
};

const fsmComponents = {};

export { fsmCustomizations, fsmComponents };
