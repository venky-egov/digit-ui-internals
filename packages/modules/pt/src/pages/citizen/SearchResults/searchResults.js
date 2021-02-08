import React from "react";
import { CardSubHeader, ResponseComposer } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";

const PropertySearchResults = ({ template, header, actionButtonLabel, t }) => {
  const { mobileNumber, propertyIds, oldpropertyids } = Digit.Hooks.useQueryParams();
  console.log({ mobileNumber });

  const result = Digit.Hooks.pt.usePropertySearch({ tenantId: "pb", filters: { mobileNumber, propertyIds, oldpropertyids } });
  console.log({ property: result });
  const searchResults = result?.data?.Properties?.map( property => {
    let addr = property?.address || {}

   return { 
      property_id: property?.propertyId,
      owner_name:(property?.owners || [])[0]?.name,
      property_address: [(addr?.doorNo || ''), (addr?.buildingName || ''), (addr?.street || ''), (addr?.locality?.name || ''), (addr?.city || '') ].filter(a => a).join(', '),
      total_due: "124",
      bil_due__date: "25-01-2022"
    }
  })

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
