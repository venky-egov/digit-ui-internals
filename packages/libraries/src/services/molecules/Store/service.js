import { LocalizationService } from "../../elements/Localization/service";
import { MdmsService } from "../../elements/MDMS";
import { Storage } from "../../atoms/Utils/Storage";

const getImgUrl = (url, fallbackUrl) => {
  if (!url && fallbackUrl) {
    return fallbackUrl;
  }
  if (url.includes("s3.ap-south-1.amazonaws.com")) {
    const baseDomain = window?.location?.origin;
    return url.replace("https://s3.ap-south-1.amazonaws.com", baseDomain);
  }
  return url;
};
const addLogo = (id, url, fallbackUrl = "") => {
  const containerDivId = "logo-img-container";
  let containerDiv = document.getElementById(containerDivId);
  if (!containerDiv) {
    containerDiv = document.createElement("div");
    containerDiv.id = containerDivId;
    containerDiv.style = "position: absolute; top: 0; left: -9999px;";
    document.body.appendChild(containerDiv);
  }
  const img = document.createElement("img");
  img.src = getImgUrl(url, fallbackUrl);
  img.id = `logo-${id}`;
  containerDiv.appendChild(img);
};

const renderTenantLogos = (stateInfo, tenants) => {
  addLogo(stateInfo.code, stateInfo.logoUrl);
  tenants.forEach((tenant) => {
    addLogo(tenant.code, tenant.logoId, stateInfo.logoUrl);
  });
};

export const StoreService = {
  getInitData: () => {
    return Storage.get("initData");
  },

  getBoundries: async (tenants) => {
    let allBoundries = [];
    allBoundries = tenants.map((tenant) => {
      return Digit.LocationService.getLocalities({ tenantId: tenant.code });
    });
    return await Promise.all(allBoundries);
  },
  digitInitData: async (stateCode, enabledModules) => {
    const { MdmsRes } = await MdmsService.init(stateCode);
    const stateInfo = MdmsRes["common-masters"].StateInfo[0];
    const localities = {};
    const initData = {
      languages: stateInfo.hasLocalisation ? stateInfo.languages : [{ label: "ENGLISH", value: "en_IN" }],
      stateInfo: {
        code: stateInfo.code,
        name: stateInfo.name,
        logoUrl: stateInfo.logoUrl,
        logoUrlWhite: stateInfo.logoUrlWhite,
        bannerUrl: stateInfo.bannerUrl,
      },
      localizationModules: stateInfo.localizationModules,
      modules: MdmsRes?.tenant?.citymodule.filter((module) => enabledModules.includes(module.code)),
    };
    initData.selectedLanguage = initData.languages[0].value;

    // TODO: remove the FSM & Payment temp data once added in mdms master
    initData.modules.push({
      module: "Payment",
      code: "Payment",
      tenants: [{ code: "pb.amritsar" }],
    });

    const moduleTenants = initData.modules
      .map((module) => module.tenants)
      .flat()
      .reduce((unique, ele) => (unique.find((item) => item.code === ele.code) ? unique : [...unique, ele]), []);
    initData.tenants = MdmsRes?.tenant?.tenants
      .filter((item) => !!moduleTenants.find((mt) => mt.code === item.code))
      .map((tenant) => ({ i18nKey: `TENANT_TENANTS_${tenant.code.replace(".", "_").toUpperCase()}`, ...tenant }));

    await LocalizationService.getLocale({
      modules: [
        `rainmaker-${stateCode.toLowerCase()}`,
        ...initData.localizationModules.map((module) => module.value),
        ...initData.tenants.map((tenant) => `rainmaker-${tenant.code.toLowerCase()}`),
      ],
      locale: initData.selectedLanguage,
      tenantId: stateCode,
    });
    Storage.set("initData", initData);
    let tenantBoundriesList = await StoreService.getBoundries(initData.tenants);
    tenantBoundriesList.forEach((boundry) => {
      localities[boundry.TenantBoundary[0].tenantId] = Digit.LocalityService.get(boundry.TenantBoundary[0]);
    });
    initData.localities = localities;
    setTimeout(() => {
      renderTenantLogos(stateInfo, initData.tenants);
    }, 0);
    return initData;
  },
  defaultData: async (stateCode, moduleCode, language) => {
    const LocalePromise = LocalizationService.getLocale({
      modules: [`rainmaker-${moduleCode.toLowerCase()}`],
      locale: language,
      tenantId: stateCode,
    });
    await LocalePromise;
    return {};
  },
};
