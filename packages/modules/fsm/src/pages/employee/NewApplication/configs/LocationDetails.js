const LocationDetails = () => {
  const cities = Digit.Hooks.fsm.useTenants();
  const getCities = () => cities?.filter((e) => e.code === Digit.ULBService.getCurrentTenantId()) || [];

  return {
    head: t("ES_NEW_APPLICATION_LOCATION_DETAILS"),
    body: [
      {
        label: t("ES_NEW_APPLICATION_PINCODE"),
        type: "text",
        populators: {
          name: "pincode",
          error: t("CORE_COMMON_PINCODE_INVALID"),
          onChange: handlePincode,
          validation: { pattern: /^[1-9][0-9]{5}$/, validate: isPincodeValid },
        },
      },
      {
        label: t("ES_NEW_APPLICATION_LOCATION_CITY"),
        isMandatory: true,
        type: "dropdown",
        populators: (
          <Dropdown isMandatory freeze={true} selected={selectedCity} option={getCities()} id="city" select={selectCity} optionKey="name" />
        ),
      },
      {
        label: t("ES_NEW_APPLICATION_LOCATION_MOHALLA"),
        isMandatory: true,
        type: "dropdown",
        populators: (
          <Dropdown isMandatory selected={selectedLocality} optionKey="code" id="locality" option={localities} select={selectLocality} t={t} />
        ),
      },
      {
        label: t("ES_NEW_APPLICATION_SLUM_NAME"),
        type: "dropdown",
        isMandatory: true,
        populators: <Dropdown option={slumMenu} optionKey="name" id="slum" selected={slum} select={selectSlum} />,
      },
      {
        label: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_STREET_NAME_LABEL"),
        type: "text",
        populators: {
          name: "streetName",
          error: t("CORE_COMMON_STREET_INVALID"),
          validation: { pattern: /^[\w\s]{1,256}$/ },
        },
      },
      {
        label: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_DOOR_NO_LABEL"),
        type: "text",
        populators: {
          name: "doorNo",
          error: t("CORE_COMMON_DOOR_INVALID"),
          validation: {
            pattern: /^[\w]([\w\/,\s])*$/,
          },
        },
      },
      {
        label: t("ES_NEW_APPLICATION_LOCATION_LANDMARK"),
        type: "textarea",
        populators: {
          name: "landmark",
        },
      },
    ],
  };
};

export default LocationDetails;
