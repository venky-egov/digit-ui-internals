import React from "react";
import { CardSubHeader, ResponseComposer, Loader } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const PropertySearchResults = ({ template, header, actionButtonLabel, t }) => {
  const { mobileNumber, propertyIds, oldpropertyids } = Digit.Hooks.useQueryParams();
  console.log({ mobileNumber });
  const result = Digit.Hooks.pt.usePropertySearch({ tenantId: "pb", filters: { mobileNumber, propertyIds, oldpropertyids } });
  console.log({ property: result });
  const consumerCodes = result?.data?.Properties?.map((a) => a.propertyId).join(",");
  const paymentDetails = Digit.Hooks.pt.usePropertyPayment({ tenantId: "pb", consumerCodes });
  const history = useHistory();
  if (result.error || !consumerCodes) {
    return <div>No Results</div>;
  }
  if (paymentDetails.isLoading || result.isLoading) {
    return <Loader />;
  }

  const onSubmit = (data) => {
    console.log("data from composer", data);
    history.push(`/digit-ui/citizen/payment/my-bills/PT/${data.property_id}`, { tenantId: "pb" });
  };

  const payment = {};
  paymentDetails?.data?.Bill?.forEach((element) => {
    if (element?.consumerCode) {
      payment[element?.consumerCode] = {
        total_due: element?.totalAmount,
        bil_due__date: new Date(element?.billDate).toDateString(),
      };
    }
  });
  const searchResults = result?.data?.Properties?.map((property) => {
    let addr = property?.address || {};

    return {
      property_id: property?.propertyId,
      owner_name: (property?.owners || [])[0]?.name,
      property_address: [addr.doorNo || "", addr.buildingName || "", addr.street || "", addr.locality?.name || "", addr.city || ""]
        .filter((a) => a)
        .join(", "),
      total_due: payment[property?.propertyId]?.total_due || 0,
      bil_due__date: payment[property?.propertyId]?.bil_due__date || "No Demand Found",
    };
  });

  return (
    <div>
      {header && <CardSubHeader style={{ marginLeft: "8px" }}> {t(header)} </CardSubHeader>}
      <ResponseComposer data={searchResults} template={template} actionButtonLabel={actionButtonLabel} onSubmit={onSubmit} />
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
