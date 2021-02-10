import React from "react";
import TextInput from "../atoms/TextInput";
import CardText from "../atoms/CardText";

const PitDimension = ({ sanitationType, t, size = {}, handleChange }) => {
  // console.log("find sanitationType in pitDimensions here",sanitationType.dimension, size)
  return sanitationType?.dimension === "dd" ? (
    <div className="inputWrapper">
      <div>
        <TextInput name="diameter" value={size["diameter"] || ""} onChange={handleChange} pattern="^[1-9]\d?(\.\d{1,2})?$" />
        <CardText style={{ textAlign: "center" }}>{t("CS_FILE_PROPERTY_DIAMETER")}</CardText>
      </div>
      <span>x</span>
      <div>
        <TextInput name="height" value={size["height"] || ""} onChange={handleChange} pattern="^[1-9]\d?(\.\d{1,2})?$" />
        <CardText style={{ textAlign: "center" }}>{t("CS_FILE_PROPERTY_HEIGHT")}</CardText>
      </div>
    </div>
  ) : (
    <div className="inputWrapper">
      <div>
        <TextInput name="length" value={size["length"] || ""} onChange={handleChange} pattern="^[1-9]\d?(\.\d{1,2})?$" />
        <CardText style={{ textAlign: "center" }}>{t("CS_FILE_PROPERTY_LENGTH")}</CardText>
      </div>
      <span>x</span>
      <div>
        <TextInput name="width" value={size["width"] || ""} onChange={handleChange} pattern="^[1-9]\d?(\.\d{1,2})?$" />
        <CardText style={{ textAlign: "center" }}>{t("CS_FILE_PROPERTY_WIDTH")}</CardText>
      </div>
      <span>x</span>
      <div>
        <TextInput name="height" value={size["height"] || ""} onChange={handleChange} pattern="^[1-9]\d?(\.\d{1,2})?$" />
        <CardText style={{ textAlign: "center" }}>{t("CS_FILE_PROPERTY_HEIGHT")}</CardText>
      </div>
    </div>
  );
};

export default PitDimension;
