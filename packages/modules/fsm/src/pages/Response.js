import React, { useEffect } from "react";
import { Card, Banner, CardText, SubmitBar, Loader, LinkButton } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import getPDFData from "../getPDFData";
import { getVehicleType } from "../utils";

const GetActionMessage = (action, isSuccess) => {
  const { t } = useTranslation();
  if (isSuccess) {
    switch (action) {
      case "REOPEN":
        return t(`CS_COMMON_COMPLAINT_REOPENED`);
      case "RATE":
        return t("CS_COMMON_THANK_YOU");
      case "PENDING_APPL_FEE_PAYMENT":
        return t("CS_FILE_DESLUDGING_APPLICATION_SUCCESS");
      case "SUBMIT_FEEDBACK":
      case "COMPLETED":
        return t("CS_APPLICATION_FEEDBACK_SUCCESSFUL");
      default:
        return t(`ES_PAYMENT_COLLECTED`);
    }
  }

  switch (action) {
    case "REOPEN":
      return t(`CS_COMMON_COMPLAINT_REOPENED_FAILED`);
    case "RATE":
      return t("CS_COMMON_ERROR");
    case "PENDING_APPL_FEE_PAYMENT":
      return t("CS_FILE_DESLUDGING_APPLICATION_FAILED");
    case "SUBMIT_FEEDBACK":
      return t("CS_APPLICATION_FEEDBACK_FAILED");
    default:
      return t(`ES_PAYMENT_COLLECTED_ERROR`);
  }
};

const GetLabel = (action) => {
  const { t } = useTranslation();
  switch (action) {
    case "PENDING_APPL_FEE_PAYMENT":
      return t("CS_FILE_DESLUDGING_APPLICATION_NO");
    default:
      return t("ES_RECEIPT_NO");
  }
};

const BannerPicker = (props) => {
  const { t } = useTranslation();
  return (
    <Banner
      message={GetActionMessage(props.data?.fsm[0].applicationStatus || props.action, props.isSuccess)}
      applicationNumber={props.data?.fsm[0].applicationNo}
      info={GetLabel(props.data?.fsm[0].applicationStatus)}
      successful={props.isSuccess}
    />
  );
};

const Response = (props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const paymentAccess = Digit.UserService.hasAccess("FSM_COLLECTOR");
  // console.log("find payment Roles here", paymentAccess)

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { state } = props.location;

  const mutation = state.key === "update" ? Digit.Hooks.fsm.useApplicationActions(tenantId) : Digit.Hooks.fsm.useDesludging(tenantId);
  const coreData = Digit.Hooks.useCoreData();
  const localityCode = mutation?.data?.fsm[0].address?.locality?.code;
  const slumCode = mutation?.data?.fsm[0].address?.slumName;
  const slum = Digit.Hooks.fsm.useSlum(slumCode, localityCode);
  const { data: vehicleMenu } = Digit.Hooks.fsm.useMDMS(state, "Vehicle", "VehicleType", { staleTime: Infinity });
  const vehicle = vehicleMenu?.find((vehicle) => mutation?.data?.fsm[0]?.vehicleType === vehicle?.code);
  const pdfVehicleType = getVehicleType(vehicle, t);

  const handleDownloadPdf = () => {
    const { fsm } = mutation.data;
    const [applicationDetails, ...rest] = fsm;
    const tenantInfo = coreData.tenants.find((tenant) => tenant.code === applicationDetails.tenantId);

    const data = getPDFData({ ...applicationDetails, slum, pdfVehicleType }, tenantInfo, t);
    Digit.Utils.pdf.generate(data);
  };

  useEffect(() => {
    const onSuccess = () => {
      queryClient.invalidateQueries("FSM_CITIZEN_SEARCH");
      const inbox = queryClient.getQueryData("FUNCTION_RESET_INBOX");
      inbox?.revalidate();
    };
    console.log("state -------->", state);
    if (state.key === "update") {
      // console.log("find state here", state.applicationData, state.action)
      mutation.mutate(
        {
          fsm: state.applicationData,
          workflow: {
            action: state.action,
            ...state.actionData,
          },
        },
        {
          onSuccess,
        }
      );
    } else {
      // console.log("find state here", state);
      mutation.mutate(state, {
        onSuccess,
      });
    }
  }, []);

  const displayText = (action) => {
    switch (action) {
      case "SUBMIT_FEEDBACK":
        return t("CS_SUBMIT_FEEDBACK_RESPONSE");
      default:
        return t("CS_FILE_PROPERTY_RESPONSE");
    }
  };

  return mutation.isLoading || mutation.isIdle ? (
    <Loader />
  ) : (
    <Card>
      {(!mutation.isIdle || !mutation.isLoading) && (
        <BannerPicker
          t={t}
          data={mutation.data}
          action={state.action}
          isSuccess={mutation.isSuccess}
          isLoading={mutation.isIdle || mutation.isLoading}
        />
      )}
      <CardText>{displayText(state.action)}</CardText>
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
        />
      )}
      <Link to={`${props.parentRoute.includes("employee") ? "/digit-ui/employee" : "/digit-ui/citizen"}`}>
        <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
      {props.parentRoute.includes("employee") && state?.applicationData?.applicationNo && paymentAccess && mutation.isSuccess && (
        <div className="secondary-action">
          <Link to={`/digit-ui/employee/payment/collect/FSM.TRIP_CHARGES/${state?.applicationData?.applicationNo}`}>
            <SubmitBar label={t("ES_COMMON_PAY")} />
          </Link>
        </div>
      )}
    </Card>
  );
};

export default Response;
