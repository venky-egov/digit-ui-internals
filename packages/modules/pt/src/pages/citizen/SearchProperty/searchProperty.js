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
        `/digit-ui/citizen/pt/property/search-results?mobileNumber=${data.mobileNumber}&propertyIds=${data.propertyId}&oldPropertyIds=${data.oldPropertyId}`
      );
    }
  };

  const [mobileNumber, property, oldProperty] = propsConfig.inputs;

  const config = [
    {
      body: [
        {
          label: mobileNumber.label,
          description: mobileNumber.description,
          type: mobileNumber.type,
          populators: {
            name: mobileNumber.name,
          },
          isMandatory: false,
        },
        {
          label: property.label,
          type: property.type,
          populators: {
            name: property.name,
          },
          isMandatory: false,
        },
        {
          label: oldProperty.label,
          type: oldProperty.type,
          populators: {
            name: oldProperty.name,
          },
          isMandatory: false,
        },
      ],
    },
  ];

  console.log(config[0].body);

  return (
    <div style={{ marginTop: "16px" }}>
      <FormComposer
        onSubmit={onPropertySearch}
        noBoxShadow
        inline
        submitInForm
        config={config}
        label={propsConfig.texts.submitButtonLabel}
        heading={propsConfig.texts.header}
        text={propsConfig.texts.text}
        cardStyle={{ margin: "auto" }}
        headingStyle={{ fontSize: "32px", marginBottom: "16px" }}
      ></FormComposer>
    </div>
  );
};

SearchProperty.propTypes = {
  loginParams: PropTypes.any,
};

SearchProperty.defaultProps = {
  loginParams: null,
};

export default SearchProperty;
