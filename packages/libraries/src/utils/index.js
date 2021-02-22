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

export default { pdf: PDFUtil, browser: BrowserUtil, locale, GetParamFromUrl };
