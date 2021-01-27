import React, { useEffect } from "react";
import { Card, Banner, CardText, SubmitBar, Loader } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

const GetActionMessage = ({ action }) => {
  const { t } = useTranslation();
  switch (action) {
    case "REOPEN":
      return t(`CS_COMMON_COMPLAINT_REOPENED`);
    case "RATE":
      return t("CS_COMMON_THANK_YOU");
    case "PENDING_APPL_FEE_PAYMENT":
      return t("CS_FILE_DESLUDGING_APPLICATION_SUCCESS");
    default:
      return t(`ES_PAYMENT_COLLECTED`);
  }
};

const BannerPicker = (props) => {
  const { t } = useTranslation();
  return (
    <Banner
      message={GetActionMessage(props.data?.fsm[0].applicationStatus)}
      complaintNumber={props.data?.fsm[0].applicationNo}
      info={t("ES_RECEIPT_NO")}
      successful={props.isSuccess}
    />
  );
};

const Response = (props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.fsm.useDesludging(tenantId);
  useEffect(() => {
    const onSuccess = () => {
      queryClient.invalidateQueries("FSM_CITIZEN_SEARCH");
    };
    const { state } = props.location;
    mutation.mutate(state, {
      onSuccess,
    });
  }, []);

  return mutation.isLoading || mutation.isIdle ? (
    <Loader />
  ) : (
    <Card>
      <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={mutation.isIdle || mutation.isLoading} />
      <CardText>{t("CS_FILE_PROPERTY_RESPONSE")}</CardText>
      <Link to={`/digit-ui/employee`}>
        <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
    </Card>
  );
};

export default Response;
