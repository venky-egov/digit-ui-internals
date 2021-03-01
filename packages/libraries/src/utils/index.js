import PDFUtil from "./pdf";
import BrowserUtil from "./browser";
import * as locale from "./locale";

const GetParamFromUrl = (key, fallback, search) => {
  if (typeof window !== "undefined") {
    search = search || window.location.search;
    const params = new URLSearchParams(search);
    return params.has(key) ? params.get(key) : fallback;
  }
  return fallback;
};

const getStaticMapUrl = (latitude, longitude) => {
  const key = globalConfigs?.getConfig("GMAPS_API_KEY");
  return `https://maps.googleapis.com/maps/api/staticmap?markers=color:red%7C${latitude},${longitude}&zoom=15&size=400x400&key=${key}`;
};

export default { pdf: PDFUtil, browser: BrowserUtil, locale, GetParamFromUrl, getStaticMapUrl };
