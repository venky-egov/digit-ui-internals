import React from "react";
import TextInput from "../atoms/TextInput";
import CardText from "../atoms/CardText";

const PitDimension = ({ t, size = {}, handleChange }) => {
  return (
    <div className="inputWrapper">
      <div>
        <TextInput name="length" value={size["length"] || ""} onChange={handleChange} />
        <CardText style={{ textAlign: "center" }}>{t("CS_FILE_PROPERTY_LENGTH")}</CardText>
      </div>
      <span>x</span>
      <div>
        <TextInput name="width" value={size["width"] || ""} onChange={handleChange} />
        <CardText style={{ textAlign: "center" }}>{t("CS_FILE_PROPERTY_WIDTH")}</CardText>
      </div>
      <span>x</span>
      <div>
        <TextInput name="height" value={size["height"] || ""} onChange={handleChange} />
        <CardText style={{ textAlign: "center" }}>{t("CS_FILE_PROPERTY_HEIGHT")}</CardText>
      </div>
    </div>
  );
};

export default PitDimension;