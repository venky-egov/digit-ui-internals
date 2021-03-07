import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header, Card, KeyNote, LinkButton, Loader } from "@egovernments/digit-ui-react-components";
import { useHistory, useParams } from "react-router-dom";
import getPDFData from "../../getPDFData";
import { getVehicleType } from "../../utils";
import { ApplicationTimeline } from "../../components/ApplicationTimeline";

const ApplicationDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { isLoading, isError, error, data: application, error: errorApplication } = Digit.Hooks.fsm.useApplicationDetail(
    t,
    tenantId,
    id,
    {},
    "CITIZEN"
  );

  const state = tenantId?.split(".")[0];
  const { data: vehicleMenu } = Digit.Hooks.fsm.useMDMS(state, "Vehicle", "VehicleType", { staleTime: Infinity });
  const vehicle = vehicleMenu?.find((vehicle) => application?.pdfData?.vehicleType === vehicle?.code);
  const pdfVehicleType = getVehicleType(vehicle, t);
  const localityCode = application?.pdfData?.address?.locality?.code;
  const slumCode = application?.pdfData?.address?.slumName;
  const slum = Digit.Hooks.fsm.useSlum(slumCode, localityCode);

  const coreData = Digit.Hooks.useCoreData();

  useEffect(() => {
    console.log(application?.pdfData, errorApplication);
  }, [application, errorApplication]);

  if (isLoading || !application) {
    return <Loader />;
  }

  if (application?.applicationDetails?.length === 0) {
    history.goBack();
  }

  const tenantInfo = coreData.tenants.find((tenant) => tenant.code === application?.tenantId);

  const handleDownloadPdf = async () => {
    const data = getPDFData({ ...application?.pdfData, pdfVehicleType, slum }, tenantInfo, t);
    Digit.Utils.pdf.generate(data);
  };

  return (
    <React.Fragment>
      <Header>{t("CS_FSM_APPLICATION_DETAIL_TITLE_APPLICATION_DETAILS")}</Header>
      <Card style={{ position: "relative" }}>
        <LinkButton
          label={
            <div className="application-details-link-button">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f47738">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
              </span>
              <span className="download-button">{t("CS_COMMON_DOWNLOAD")}</span>
            </div>
          }
          style={{ position: "absolute", top: 0, right: 20 }}
          onClick={handleDownloadPdf}
        />

        {application?.applicationDetails?.map(({ title, value, child, caption }, index) => {
          return (
            <KeyNote key={index} keyValue={t(title)} note={t(value) || "N/A"} caption={t(caption)}>
              {child && typeof child === "object" ? React.createElement(child.element, { ...child }) : child}
            </KeyNote>
          );
        })}
        <ApplicationTimeline application={application?.pdfData} id={id} />
      </Card>
    </React.Fragment>
  );
};

export default ApplicationDetails;
