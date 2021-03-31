import React from "react";
import { Header, ResponseComposer, Loader } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PropertySearchResults = ({ template, header, actionButtonLabel }) => {
  const { t } = useTranslation();
  const { mobileNumber, propertyIds, oldPropertyIds } = Digit.Hooks.useQueryParams();
  const filters = {};
  if (mobileNumber) filters.mobileNumber = mobileNumber;
  if (propertyIds) filters.propertyIds = propertyIds;
  if (oldPropertyIds) filters.oldPropertyIds = oldPropertyIds;

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const result = Digit.Hooks.pt.usePropertySearch({ filters });
  const consumerCode = result?.data?.Properties?.map((a) => a.propertyId).join(",");
  const paymentDetails = Digit.Hooks.useFetchCitizenBillsForBuissnessService(
    { consumerCode, businessService: "PT" },
    { enabled: consumerCode ? true : false }
  );

  const history = useHistory();

  if (paymentDetails.isLoading || result.isLoading) {
    return <Loader />;
  }

  if (result.error || !consumerCode) {
    return <div>{t("CS_PT_NO_PROPERTIES_FOUND")}</div>;
  }

  const onSubmit = (data) => {
    history.push(`/digit-ui/citizen/payment/my-bills/PT/${data.property_id}`, { tenantId });
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
      bil_due__date: payment[property?.propertyId]?.bil_due__date || t("N/A"),
    };
  });

  return (
    <div className="static" style={{ marginTop: "16px" }}>
      <div className="static-wrapper">
        {header && <Header style={{ marginLeft: "8px" }}>{t(header)}</Header>}
        <ResponseComposer data={searchResults} template={template} actionButtonLabel={actionButtonLabel} onSubmit={onSubmit} />
      </div>

      <p style={{ marginLeft: "16px", marginTop: "16px" }}>
        {t("PT_TEXT_NOT_ABLE_TO_FIND_THE_PROPERTY")}{" "}
        <span className="link">
          <Link to="/digit-ui/citizen/pt/property/search">{t("PT_COMMON_CLICK_HERE")}</Link>
        </span>
      </p>
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
