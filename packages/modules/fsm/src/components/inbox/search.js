import React, { useState } from "react";
import { useForm } from "react-hook-form";
const { TextInput, Label, SubmitBar, LinkLabel, ActionBar, CloseSvg } = require("@egovernments/digit-ui-react-components");
import { useTranslation } from "react-i18next";

const SearchApplication = ({ onSearch, type, onClose, isFstpOperator, searchFields, isInboxPage }) => {
  const { t } = useTranslation();
  const [applicationNo, setApplicationNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const mobileView = innerWidth <= 640;

  const onSubmitInput = (data) => {
    console.log("data", data);
    if (!data.mobileNumber) {
      delete data.mobileNumber;
    }

    onSearch(data);
    if (type === "mobile") {
      onClose();
    }
  };

  function clearSearch() {
    reset();
    onSearch({});
  }

  const clearAll = (mobileView) => {
    const mobileViewStyles = mobileView ? { margin: 0 } : {};
    return (
      <LinkLabel style={{ color: "#F47738", cursor: "pointer", ...mobileViewStyles }} onClick={clearSearch}>
        {t("ES_COMMON_CLEAR_SEARCH")}
      </LinkLabel>
    );
  };

  function setComplaint(e) {
    setApplicationNo(e.target.value);
  }

  function setMobile(e) {
    setMobileNo(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit(onSubmitInput)}>
      <React.Fragment>
        <div className="search-container" style={{ width: "auto", marginLeft: isInboxPage ? "24px" : "revert" }}>
          <div className="search-complaint-container">
            {(type === "mobile" || mobileView) && (
              <div
                className="complaint-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <h2>{t("ES_COMMON_SEARCH_BY")}</h2>
                <span onClick={onClose}>
                  <CloseSvg />
                </span>
              </div>
            )}
            <div className="complaint-input-container" style={{ width: "100%" }}>
              {searchFields?.map((input, index) => (
                <span key={index} className={index === 0 ? "complaint-input" : "mobile-input"}>
                  <Label>{input.label}</Label>
                  <TextInput {...input} inputRef={register} />
                </span>
              ))}
              {/* <span className="complaint-input">
                <Label>{isFstpOperator ? t("ES_FSTP_OPERATOR_VEHICLE_NO") : t("ES_SEARCH_APPLICATION_APPLICATION_NO")}</Label>
                <TextInput
                  name="applicationNo"
                  value={applicationNo}
                  onChange={setComplaint}
                  inputRef={register}
                  style={{ width: "280px", marginBottom: "8px" }}
                ></TextInput>
              </span>
              <span className="mobile-input">
                <Label>{isFstpOperator ? t("ES_FSTP_DSO_NAME") : t("ES_SEARCH_APPLICATION_MOBILE_NO")}</Label>
                <TextInput name="mobileNumber" value={mobileNo} onChange={setMobile} inputRef={register} style={{ width: "280px" }}></TextInput>
              </span> */}
              {type === "desktop" && !mobileView && (
                <SubmitBar style={{ marginTop: 32, marginLeft: "96px", maxWidth: "256px" }} label={t("ES_COMMON_SEARCH")} submit />
              )}
            </div>
            {type === "desktop" && !mobileView && <span className="clear-search">{clearAll()}</span>}
          </div>
        </div>
        {(type === "mobile" || mobileView) && (
          <ActionBar style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button className="clear-search" style={{ flex: 1 }}>
              {clearAll(mobileView)}
            </button>
            <SubmitBar label={t("ES_COMMON_SEARCH")} style={{ flex: 1 }} submit={true} />
          </ActionBar>
        )}
      </React.Fragment>
    </form>
  );
};

export default SearchApplication;
