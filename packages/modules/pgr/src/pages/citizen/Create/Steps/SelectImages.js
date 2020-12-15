import React, { useState } from "react";
import { FormStep, ImageUploadHandler, Loader } from "@egovernments/digit-ui-react-components";

const SelectImages = ({ t, config, onSelect, ...props }) => {
  const __initImages = Digit.SessionStorage.get("PGR_CREATE_IMAGES");
  const [uploadedImages, setUploadedImagesIds] = useState(__initImages ? __initImages : null);

  const handleUpload = (ids) => {
    setUploadedImagesIds(ids);
    Digit.SessionStorage.set("PGR_CREATE_IMAGES", ids);
  };

  const onSkip = () => {
    props.nextStep();
  };

  const uploadImages = () => {
    props.dispatcher({ type: "EDIT", delta: { uploadedImages } });
    props.nextStep();
  };

  return (
    <FormStep config={config} onSelect={() => uploadImages()} onSkip={onSkip} t={t}>
      <ImageUploadHandler onPhotoChange={handleUpload} />
    </FormStep>
  );
};

export default SelectImages;
