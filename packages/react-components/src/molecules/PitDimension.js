import React from "react";
import TextInput from "../atoms/TextInput";
import CardText from "../atoms/CardText";

const PitDimension = ({ sanitationType, t, size = {}, handleChange, disable = false }) => {
  // console.log("find sanitationType in pitDimensions here",sanitationType.dimension, size)
  return sanitationType?.dimension === "dd" ? (
    <div className="inputWrapper">
      <div>
        <TextInput
          name="diameter"
          value={size["diameter"] || ""}
          onChange={handleChange}
          disable={disable}
          min="0"
          max="100"
          pattern="^\d*(\.\d{0,1})?$"
        />
        <CardText style={{ textAlign: "center" }} disable={disable}>
          {t("CS_FILE_PROPERTY_DIAMETER")}
        </CardText>
      </div>
      <span>x</span>
      <div>
        <TextInput
          name="height"
          value={size["height"] || ""}
          onChange={handleChange}
          disable={disable}
          min="0"
          max="100"
          pattern="^\d*(\.\d{0,1})?$"
        />
        <CardText style={{ textAlign: "center" }} disable={disable}>
          {t("CS_FILE_PROPERTY_HEIGHT")}
        </CardText>
      </div>
    </div>
  ) : (
    <div className="inputWrapper">
      <div>
        <TextInput
          name="length"
          value={size["length"] || ""}
          onChange={handleChange}
          disable={disable}
          min="0"
          max="100"
          pattern="^\d*(\.\d{0,1})?$"
        />
        <CardText style={{ textAlign: "center" }} disable={disable}>
          {t("CS_FILE_PROPERTY_LENGTH")}
        </CardText>
      </div>
      <span>x</span>
      <div>
        <TextInput name="width" value={size["width"] || ""} onChange={handleChange} disable={disable} min="0" max="100" pattern="^\d*(\.\d{0,1})?$" />
        <CardText style={{ textAlign: "center" }} disable={disable}>
          {t("CS_FILE_PROPERTY_WIDTH")}
        </CardText>
      </div>
      <span>x</span>
      <div>
        <TextInput
          name="height"
          value={size["height"] || ""}
          onChange={handleChange}
          disable={disable}
          min="0"
          max="100"
          pattern="^\d*(\.\d{0,1})?$"
        />
        <CardText style={{ textAlign: "center" }} disable={disable}>
          {t("CS_FILE_PROPERTY_HEIGHT")}
        </CardText>
      </div>
    </div>
  );
};

export default PitDimension;
