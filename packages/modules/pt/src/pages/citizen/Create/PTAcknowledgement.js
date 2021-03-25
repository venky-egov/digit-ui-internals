import { Banner, Card, CardText, LinkButton, Loader, SubmitBar } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import getPTAcknowledgementData from "../../../getPTAcknowledgementData";

const GetActionMessage = (props) => {
  const { t } = useTranslation();
  if(props.isSuccess){
    return t("CS_PROPERTY_APPLICATION_SUCCESS");
  }else if(props.isLoading){
    return t("CS_PROPERTY_APPLICATION_PENDING");
  }else if(!props.isSuccess){
    return t("CS_PROPERTY_APPLICATION_FAILED");
  }
 
};

const BannerPicker = (props) => {
  return (
    <Banner
      message={GetActionMessage(props)}
      applicationNumber={props.data?.Properties[0].acknowldgementNumber}
      info={props.t("PT_APPLICATION_NO")}
      successful={props.isSuccess}
    />
  );
};

const PTAcknowledgement = ({ data, onSuccess }) => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.pt.usePropertyAPI(data?.address?.city ? data.address?.city?.code : tenantId);
  const coreData = Digit.Hooks.useCoreData();

  useEffect(() => {
    try {
      const { subtype, pitDetail, address, pitType, source, ownershipCategory, owners } = data;
      const loc = address?.locality.code;
      const formdata = {
        Property: {
          tenantId: address?.city?.code||'pb.amritsar',
          address: {
            pincode:address?.pincode,
            landmark:address?.landmark,
            city: address?.city?.name,
            doorNo: address?.doorNo,
            buildingName: "NA",
            locality: {
              code: loc && loc.split("_").length == 4 ? loc.split("_")[3] : "NA",
              area: address?.locality?.name,
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
              tenantId: address?.city?.code,
              usageCategory: "RESIDENTIAL",
            },
          ],
          usageCategoryMajor: "RESIDENTIAL",
          landArea: "2000",
          propertyType: "BUILTUP.SHAREDPROPERTY",
          noOfFloors: 1,
          ownershipCategory: "INDIVIDUAL.SINGLEOWNER",
          owners: owners && owners.map((owners, index) => ({
            name: owners?.name||'Ajit',
            mobileNumber: owners?.mobileNumber||"9965664222",
            fatherOrHusbandName: owners?.fatherOrHusbandName,
            emailId: null,
            permanentAddress: owners?.permanentAddress,
            relationship: owners?.relationship?.code,
            ownerType: owners?.ownerType?.code||'NONE',
            gender: owners?.gender?.value,
            isCorrespondenceAddress: null,
          })) || [{
            "name": "Jagan",
            "mobileNumber": "9965664222",
            "fatherOrHusbandName": "E",
            "emailId": null,
            "permanentAddress": "1111, 1111, Back Side 33 KVA Grid Patiala Road - Area1, Amritsar, ",
            "relationship": "FATHER",
            "ownerType": "FREEDOMFIGHTER",
            "gender": "MALE",
            "isCorrespondenceAddress": null
          }],

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
              documentUid: "file1.jpg",
            },
            {
              documentType: "OWNER.IDENTITYPROOF.PAN",
              fileStoreId: "985f53c5-f09f-4d17-8fa7-5593cf1de47a",
              documentUid: "file.jpg",
            },
            {
              documentType: "OWNER.REGISTRATIONPROOF.GIFTDEED",
              fileStoreId: "6aaf6f3e-21fb-4e4f-8c5b-2d98eeff2709",
              documentUid: "doc.pdf",
            },
            {
              documentType: "OWNER.USAGEPROOF.ELECTRICITYBILL",
              fileStoreId: "858cc6b5-969c-479d-a89a-91d7319e5b07",
              documentUid: "doc.pdf",
            },
            {
              documentType: "OWNER.CONSTRUCTIONPROOF.BPACERTIFICATE",
              fileStoreId: "044616b2-7556-4903-9908-941f03ac6a70",
              documentUid: "doc.pdf",
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

  const handleDownloadPdf = () => {
    const { Properties = [] } = mutation.data;
    const Property = (Properties && Properties[0]) || {};
    const tenantInfo = coreData.tenants.find((tenant) => tenant.code === Property.tenantId);
    const data = getPTAcknowledgementData({ ...Property }, tenantInfo, t);
    Digit.Utils.pdf.generate(data);
  };

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

export default PTAcknowledgement;
