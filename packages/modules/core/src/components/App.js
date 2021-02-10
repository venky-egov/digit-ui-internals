import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { TopBar, Dropdown, LogoutIcon, HomeIcon, Hamburger } from "@egovernments/digit-ui-react-components";
import ChangeLanguage from "./ChangeLanguage";
import { useSelector } from "react-redux";

import { AppModules } from "./AppModules";
import { CitizenSidebar } from "./Sidebar";

const TextToImg = (props) => (
  <span className="user-img-txt" onClick={props.toggleMenu}>
    {props.name[0].toUpperCase()}
  </span>
);
const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

export const DigitApp = ({ stateCode, modules, appTenants, logoUrl }) => {
  const { t } = useTranslation();
  const [isSidebarOpen, toggleSidebar] = useState(false);
  const [displayMenu, toggleMenu] = useState(false);
  const innerWidth = window.innerWidth;
  const cityDetails = Digit.ULBService.getCurrentUlb();
  const userDetails = Digit.UserService.getUser();
  const { stateInfo } = useSelector((state) => state.common);

  const handleLogout = () => {
    toggleSidebar(false);
    Digit.UserService.logout();
  };

  const handleUserDropdownSelection = (option) => {
    option.func();
  };

  const userOptions = [{ name: t("CORE_COMMON_LOGOUT"), icon: <LogoutIcon className="icon" />, func: handleLogout }];

  const mobileView = innerWidth <= 640;
  return (
    <Switch>
      <Route path="/digit-ui/employee">
        <div className="topbar">
          <img className="city" src={cityDetails?.logoId} />
          <span className="ulb">
            {t(cityDetails?.i18nKey)} {ulbCamel(t("ULBGRADE_MUNICIPAL_CORPORATION"))}
          </span>
          {!mobileView && (
            <div className="flex-right w-80 right column-gap-15">
              <div className="left">
                <ChangeLanguage dropdown={true} />
              </div>
              {userDetails?.access_token && (
                <div className="left ">
                  <Dropdown
                    option={userOptions}
                    optionKey={"name"}
                    select={handleUserDropdownSelection}
                    showArrow={false}
                    freeze={true}
                    customSelector={<TextToImg name={userDetails?.info?.name || userDetails?.info?.userInfo?.name || "Employee"} />}
                  />
                </div>
              )}
              <img className="state" src={logoUrl} />
            </div>
          )}
        </div>
        {!mobileView && userDetails?.access_token && (
          <div className="sidebar">
            <Link to="/digit-ui/employee">
              <div className="actions active">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="white" />
                </svg>
              </div>
            </Link>
            <a href="/employee">
              <div className="actions">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M8.17 5.7L1 10.48V21h5v-8h4v8h5V10.25z" fill="white" />
                  <path d="M17 7h2v2h-2z" fill="none" />
                  <path d="M10 3v1.51l2 1.33L13.73 7H15v.85l2 1.34V11h2v2h-2v2h2v2h-2v4h6V3H10zm9 6h-2V7h2v2z" fill="white" />
                </svg>
              </div>
            </a>
            <a href="/employee">
              <div className="actions">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"
                    fill="white"
                  />
                </svg>
              </div>
            </a>
            <a href="/employee">
              <div className="actions">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M24 0H0v24h24z" fill="none" />
                  <path
                    d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"
                    fill="white"
                  />
                </svg>
              </div>
            </a>
          </div>
        )}
        <div className="main">
          <AppModules stateCode={stateCode} userType="employee" modules={modules} appTenants={appTenants} />
        </div>
      </Route>
      <Route path="/digit-ui/citizen">
        {mobileView && (
          <TopBar
            img={cityDetails?.logoId}
            ulb={`${t(stateInfo?.name)} ${ulbCamel(t("ULBGRADE_MUNICIPAL_CORPORATION"))}`}
            isMobile={true}
            toggleSidebar={() => toggleSidebar(!isSidebarOpen)}
            logoUrl={logoUrl}
            onLogout={handleLogout}
            userDetails={userDetails}
          />
        )}
        {!mobileView && (
          <div className="topbar flex-between">
            <div>
              <Hamburger color="#0B0C0C" handleClick={() => toggleSidebar(!isSidebarOpen)} />
              <img
                className="state"
                style={stateInfo ? { height: "30px", width: "auto", marginRight: "10px" } : { marginTop: "8px", height: "30px", width: "auto" }}
                src={
                  stateInfo
                    ? stateInfo.logoUrl
                    : "https://raw.githubusercontent.com/egovernments/egov-web-app/rainmaker-v1-dynamic-state/web/rainmaker/packages/assets/images/pb/mseva-punjab.png"
                }
              />
            </div>
            <div className="right width-20 flex-right column-gap-15">
              <div className="left">
                <ChangeLanguage dropdown={true} />
              </div>
              <div className="left">
                <Dropdown
                  option={userOptions}
                  optionKey={"name"}
                  select={handleUserDropdownSelection}
                  showArrow={false}
                  style={{ right: 0 }}
                  customSelector={<TextToImg name={userDetails?.info?.name || userDetails?.info?.userInfo?.name || "Citizen"} />}
                />
              </div>
              {/* <img className="state" src={logoUrl} /> */}
            </div>
          </div>
        )}

        <CitizenSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={handleLogout} />
        <div className="main">
          <AppModules stateCode={stateCode} userType="citizen" modules={modules} appTenants={appTenants} />
        </div>
      </Route>
      <Route>
        <Redirect to="/digit-ui/citizen" />
      </Route>
    </Switch>
  );
};
