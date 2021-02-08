import React from "react";
import { CardSubHeader, ResponseComposer } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";

const PropertySearchResults = ({ template, header, actionButtonLabel, t }) => {
  const { mobileNumber, propertyIds, oldpropertyids } = Digit.Hooks.useQueryParams();
  console.log({ mobileNumber });

  const result = Digit.Hooks.pt.usePropertySearch({ tenantId: "pb", filters: { mobileNumber, propertyIds, oldpropertyids } });
  console.log({ property: result });
  const searchResults = [
    {
      total_due: "124",
      property_id: "123456789",
      owner_name: "Example Name",
      property_address: "Example Address, example country",
      bil_due__date: "25-01-2022",
    },
  ];

  return (
    <div>
      {header && <CardSubHeader style={{ marginLeft: "8px" }}> {t(header)} </CardSubHeader>}
      <ResponseComposer data={searchResults} template={template} actionButtonLabel={actionButtonLabel} />
    </div>
  );
};

PropertySearchResults.propTypes = {
  template: PropTypes.any,
  header: PropTypes.string,
  actionButtonLabel: PropTypes.string,
};

PropertySearchResults.defaultProps = {
  template: [],
  header: null,
  actionButtonLabel: null,
};

export default PropertySearchResults;
