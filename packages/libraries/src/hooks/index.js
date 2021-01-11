import { useInitStore } from "./store";
import useWorkflowDetails from "./workflow";
import useSessionStorage from "./useSessionStorage";

import useComplaintDetails from "./pgr/useComplaintDetails";
import { useComplaintsList, useComplaintsListByMobile } from "./pgr/useComplaintList";
import useComplaintStatus from "./pgr/useComplaintStatus";
import useComplaintTable from "./pgr/useComplaintTable";
import useComplaintTypes from "./pgr/useComplaintTypes";
import useEmployeeFilter from "./pgr/useEmployeeFilter";
import useInboxData from "./pgr/useInboxData";
import useLocalities from "./pgr/useLocalities";
import useServiceDefs from "./pgr/useServiceDefs";
import useTenants from "./pgr/useTenants";
import useComplaintSubType from "./pgr/useComplaintSubType";
import useOutsideClickListener from "./pgr/useOutsideClickListener";

import useTenantsFSM from "./fsm/useTenants";
import { useRevalidateQuery } from "./revalidateQuery";

const pgr = {
  useComplaintDetails,
  useComplaintsList,
  useComplaintsListByMobile,
  useComplaintStatus,
  useComplaintTable,
  useComplaintTypes,
  useEmployeeFilter,
  useInboxData,
  useLocalities,
  useServiceDefs,
  useTenants,
  useComplaintSubType,
  useOutsideClickListener,
};

const fsm = {
  useTenants: useTenantsFSM,
};

const Hooks = { useSessionStorage, useWorkflowDetails, useInitStore, pgr, fsm, useRevalidateQuery };

export default Hooks;
