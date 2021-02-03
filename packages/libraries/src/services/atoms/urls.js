const Urls = {
  MDMS: `/egov-mdms-service/v1/_search`,
  WorkFlow: `/egov-workflow-v2/egov-wf/businessservice/_search`,
  WorkFlowProcessSearch: `/egov-workflow-v2/egov-wf/process/_search`,
  localization: `/localization/messages/v1/_search`,
  location: {
    localities: `/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=ADMIN&boundaryType=Locality`,
  },

  pgr_search: `/pgr-services/v2/request/_search`,
  pgr_update: `/pgr-services/v2/request/_update`,
  filter_data: `https://run.mocky.io/v3/597a50a0-90e5-4a45-b82e-8a2186b760bd`,
  FileStore: "/filestore/v1/files",

  FileFetch: "/filestore/v1/files/url",
  PGR_Create: `/pgr-services/v2/request/_create`,
  pgr_count: `/pgr-services/v2/request/_count`,

  OTP_Send: "/user-otp/v1/_send",
  Authenticate: "/user/oauth/token",
  RegisterUser: "/user/citizen/_create",
  UserProfileUpdate: "/user/profile/_update",
  EmployeeSearch: "/egov-hrms/employees/_search",

  fsm: {
    search: "/fsm/v1/_search",
    create: "/fsm/v1/_create",
    update: "/fsm/v1/_update",
    vendorSearch: "/vendor/v1/_search",
    vehicleSearch: "/vehicle/v1/_search",
  },

  payment: {
    fetch_bill: "/billing-service/bill/v2/_fetchbill",
    create_reciept: "/collection-services/payments/_create",
    print_reciept: "/collection-services/payments",
    file_store: "/filestore/v1/files/url",
    generate_pdf: "/pdf-service/v1/_create",
    create_citizen_reciept: "/pg-service/transaction/v1/_create",
    update_citizen_reciept: "/pg-service/transaction/v1/_update",
  },
};

export default Urls;
