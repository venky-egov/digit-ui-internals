const { createProxyMiddleware } = require("http-proxy-middleware");
const createProxy = createProxyMiddleware({
  target: process.env.REACT_APP_PROXY_API || "https://egov-micro-dev.egovernments.org",
  //target: process.env.REACT_APP_PROXY_API || "https://egov-micro-qa.egovernments.org",
  changeOrigin: true,
});
const assetsProxy = createProxyMiddleware({
  target: process.env.REACT_APP_PROXY_ASSETS || "https://egov-micro-qa.egovernments.org",
  changeOrigin: true,
});
module.exports = function (app) {
  [
    "/egov-mdms-service",
    "/egov-location",
    "/localization",
    "/egov-workflow-v2",
    "/pgr-services",
    "/filestore",
    "/egov-hrms",
    "/user-otp",
    "/user",
    "/fsm",
    "/billing-service",
    "/collection-services",
    "/pdf-service",
    "/pg-service",
    "/vehicle",
    "/vendor",
    "/property-services",
  ].forEach((location) => app.use(location, createProxy));
  ["/pb-egov-assets"].forEach((location) => app.use(location, assetsProxy));
};
