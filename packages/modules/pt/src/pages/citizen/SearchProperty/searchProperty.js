import React, { useState, useEffect } from "react";
import { FormComposer, CardLabelDesc } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const SearchProperty = ({ config: propsConfig, t }) => {
  const cities = Digit.Hooks.fsm.useTenants();
  const history = useHistory();

  const onPropertySearch = async (data) => {
    if (!data.mobileNumber && !data.propertyId && !data.oldPropertyId) {
      return alert("Provide at least one parameter");
    } else {
      history.push(
        `/digit-ui/citizen/pt/property/search-results?mobileNumber=${data.mobileNumber}&=propertyIds=${data.propertyId}&oldPropertyIds=${data.oldPropertyId}`
      );
    }
  };

  const [mobileNumber, property, oldProperty] = propsConfig.inputs;
  const config = [
    {
      body: [
        {
          label: t(mobileNumber.label),
          type: mobileNumber.type,
          populators: {
            name: mobileNumber.name,
          },
          isMandatory: false,
        },
        {
          label: t(property.label),
          type: property.type,
          populators: {
            name: property.name,
          },
          isMandatory: false,
        },
        {
          label: t(oldProperty.label),
          type: oldProperty.type,
          populators: {
            name: oldProperty.name,
          },
          isMandatory: false,
        },
      ],
    },
  ];

  return (
    <FormComposer
      onSubmit={onPropertySearch}
      noBoxShadow
      inline
      submitInForm
      config={config}
      label={propsConfig.texts.submitButtonLabel}
      heading={propsConfig.texts.header}
      description={propsConfig.texts.description}
      cardStyle={{ margin: "auto" }}
    ></FormComposer>
  );
};

SearchProperty.propTypes = {
  loginParams: PropTypes.any,
};

SearchProperty.defaultProps = {
  loginParams: null,
};

export default SearchProperty;
