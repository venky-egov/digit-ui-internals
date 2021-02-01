import React, { useEffect } from "react";
import { Card, Banner, CardText, SubmitBar, LinkButton } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Loader } from "@egovernments/digit-ui-react-components";
import getPDFData from "../../../getPDFData";

const GetActionMessage = () => {
  const { t } = useTranslation();
  return t("CS_FILE_DESLUDGING_APPLICATION_SUCCESS");
};

const BannerPicker = (props) => {
  return (
    <Banner
      message={GetActionMessage()}
      applicationNumber={props.data?.fsm[0].applicationNo}
      info={props.t("CS_FILE_DESLUDGING_APPLICATION_NO")}
      successful={props.isSuccess}
    />
  );
};

const Response = ({ data, onSuccess }) => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  console.log("data---------->", data);
  const mutation = Digit.Hooks.fsm.useDesludging(data.city_complaint ? data.city_complaint.code : tenantId);
  useEffect(() => {
    try {
      const { subtype, landmark, pincode, pitDetail, city_complaint, locality_complaint, pitType, source, street, doorNo } = data;

      const formdata = {
        fsm: {
          tenantId: city_complaint.code,
          additionalDetails: {},
          propertyUsage: subtype.code,
          address: {
            tenantId: city_complaint.code,
            additionalDetails: null,
            street,
            doorNo,
            landmark,
            city: city_complaint.name,
            pincode,
            locality: {
              code: locality_complaint.code.split("_").pop(),
              name: locality_complaint.name,
            },
            geoLocation: {
              latitude: locality_complaint.latitude,
              longitude: locality_complaint.longitude,
              additionalDetails: {},
            },
          },
          pitDetail,
          source,
          sanitationtype: pitType?.code,
        },
        workflow: null,
      };
      mutation.mutate(formdata, {
        onSuccess,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const coreData = Digit.Hooks.useCoreData();

  const handleDownloadPdf = () => {
    const { fsm } = mutation.data;
    const [applicationDetails, ...rest] = fsm;

    const tenantInfo = coreData.tenants.find((tenant) => tenant.code === applicationDetails.tenantId);
    Digit.Utils.pdf.generate(getPDFData(applicationDetails, tenantInfo, t, coreData?.stateInfo?.logoUrl));
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
            <div style={{ display: "flex" }}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f47738">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
              </span>
              <span style={{ color: "#f47738", marginLeft: "8px" }}>{t("CS_COMMON_DOWNLOAD")}</span>
            </div>
          }
          onClick={handleDownloadPdf}
        />
      )}
      <Link to={`/digit-ui/citizen`}>
        <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
    </Card>
  );
};

export default Response;
