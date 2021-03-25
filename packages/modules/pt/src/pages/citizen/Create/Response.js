import { Banner, Card, CardText, LinkButton, Loader, SubmitBar } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const GetActionMessage = () => {
  const { t } = useTranslation();
  return t("CS_PROPERTY_APPLICATION_SUCCESS");
};

const BannerPicker = (props) => {
  return (
    <Banner
      message={GetActionMessage()}
      applicationNumber={props.data?.Properties[0].propertyId}
      info={props.t("CS_PROPERTY_APPLICATION_NO")}
      successful={props.isSuccess}
    />
  );
};

const Response = ({ data, onSuccess }) => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const mutation = Digit.Hooks.pt.usePropertyAPI(data?.address?.city ? data.address?.city?.code : tenantId);

  useEffect(() => {
    try {
      const { subtype, pitDetail, address, pitType, source, ownershipCategory, owners } = data;
      const loc = address?.locality.code;
      const formdata = {
        Property: {
          tenantId: address?.city.code,
          address: {
            city: address?.city.name,
            doorNo: address?.doorNo,
            buildingName: "NA",
            locality: {
              code: loc.split("_").length == 4 ? loc.split("_")[3] : "NA",
              area: address?.locality.name,
            },
          },
          usageCategoryMinor: null,
          units: [
            {
              occupancyType: "SELFOCCUPIED",
              floorNo: "0",
              constructionDetail: {
                builtUpArea: 16.67,
              },
              tenantId: address?.city.code,
              usageCategory: "RESIDENTIAL",
            },
          ],
          usageCategoryMajor: "RESIDENTIAL",
          landArea: "2000",
          propertyType: "BUILTUP.SHAREDPROPERTY",
          noOfFloors: 1,
          ownershipCategory: "INDIVIDUAL.SINGLEOWNER",
          owners: owners.map((owners, index) => ({
            name: owners?.name,
            mobileNumber: owners?.mobileNumber,
            fatherOrHusbandName: owners?.fatherOrHusbandName,
            emailId: null,
            permanentAddress: owners?.permanentAddress,
            relationship: owners?.relationship?.code,
            ownerType: owners?.ownerType?.code,
            gender: owners?.gender.value,
            isCorrespondenceAddress: null,
          })),
          additionalDetails: {
            inflammable: false,
            heightAbove36Feet: false,
          },
          source: "MUNICIPAL_RECORDS",
          channel: "CFC_COUNTER",
          documents: [
            {
              documentType: "OWNER.ADDRESSPROOF.WATERBILL",
              fileStoreId: "19caf3fe-a98b-4207-94cd-d2092f9f78a2",
              documentUid: "19caf3fe-a98b-4207-94cd-d2092f9f78a2",
            },
            {
              documentType: "OWNER.IDENTITYPROOF.PAN",
              fileStoreId: "985f53c5-f09f-4d17-8fa7-5593cf1de47a",
              documentUid: "985f53c5-f09f-4d17-8fa7-5593cf1de47a",
            },
            {
              documentType: "OWNER.REGISTRATIONPROOF.GIFTDEED",
              fileStoreId: "6aaf6f3e-21fb-4e4f-8c5b-2d98eeff2709",
              documentUid: "6aaf6f3e-21fb-4e4f-8c5b-2d98eeff2709",
            },
            {
              documentType: "OWNER.USAGEPROOF.ELECTRICITYBILL",
              fileStoreId: "858cc6b5-969c-479d-a89a-91d7319e5b07",
              documentUid: "858cc6b5-969c-479d-a89a-91d7319e5b07",
            },
            {
              documentType: "OWNER.CONSTRUCTIONPROOF.BPACERTIFICATE",
              fileStoreId: "044616b2-7556-4903-9908-941f03ac6a70",
              documentUid: "044616b2-7556-4903-9908-941f03ac6a70",
            },
          ],
          superBuiltUpArea: 16.67,
          usageCategory: "RESIDENTIAL",
          creationReason: "CREATE",
        },
      };
      mutation.mutate(formdata, {
        onSuccess,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleDownloadPdf = () => {};

  return mutation.isLoading || mutation.isIdle ? (
    <Loader />
  ) : (
    <Card>
      <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={mutation.isIdle || mutation.isLoading} />
      <CardText>{t("CS_FILE_PROPERTY_RESPONSE")}</CardText>
      {mutation.isSuccess && (
        <LinkButton
          label={
            <div className="response-download-button">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f47738">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
              </span>
              <span className="download-button">{t("CS_COMMON_DOWNLOAD")}</span>
            </div>
          }
          onClick={handleDownloadPdf}
          className="w-full"
        />
      )}
      <Link to={`/digit-ui/citizen`}>
        <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
    </Card>
  );
};

export default Response;
