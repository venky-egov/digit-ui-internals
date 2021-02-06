import { useInitStore } from "./store";
import useWorkflowDetails from "./workflow";
import useSessionStorage from "./useSessionStorage";
import useQueryParams from "./useQueryParams";
import useClickOutside from "./useClickOutside";
import useCoreData from "./useCoreData";
import { useFetchPayment, usePaymentUpdate } from "./payment";

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

import useTenantsFSM from "./fsm/useTenants";
import useDesludging from "./fsm/useDesludging";
import useApplicationStatus from "./fsm/useApplicationStatus";
import useMDMS from "./fsm/useMDMS";
import useSearch from "./fsm/useSearch";
import useInbox from "./fsm/useInbox";
import useApplicationUpdate from "./fsm/useApplicationUpdate";
import useWorkflowData from "./fsm/useWorkflowData";
import useDsoSearch from "./fsm/useDsoSearch";
import useApplicationDetail from "./fsm/useApplicationDetail";

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
};

const fsm = {
  useTenants: useTenantsFSM,
  useDesludging: useDesludging,
  useMDMS: useMDMS,
  useSearch,
  useInbox,
  useApplicationUpdate,
  useApplicationStatus,
  useWorkflowData,
  useDsoSearch,
  useApplicationDetail,
};

const Hooks = {
  useSessionStorage,
  useQueryParams,
  useFetchPayment,
  usePaymentUpdate,
  useWorkflowDetails,
  useInitStore,
  useClickOutside,
  useCoreData,
  pgr,
  fsm,
};

export default Hooks;
