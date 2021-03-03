import React, { useState, useEffect } from "react";
import { FormStep, ImageUploadHandler, Loader, UploadFile, CardLabelDesc } from "@egovernments/digit-ui-react-components";

const Proof = ({ t, config, onSelect, onSkip, value }) => {
  const [uploadedImages, setUploadedImagesIds] = useState(() => {
    const { uploadedImages } = ""; //value;
    return uploadedImages ? uploadedImages : null;
  });

  const handleUpload = (ids) => {
    setUploadedImagesIds(ids);
  };

  const handleSubmit = () => {
    if (!uploadedImages || uploadedImages.length === 0) return onSkip();
    onSelect({ specialProofIdentity: uploadedImages });
  };

  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const cityDetails = Digit.ULBService.getCurrentUlb();

  function selectfile(e) {
    setFile(e.target.files[0]);
  }
  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        if (file.size >= 5242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            // TODO: change module in file storage
            const response = await Digit.UploadServices.Filestorage("property-upload", file, "pb");
            if (response?.data?.files?.length > 0) {
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("CS_FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
            console.error("Modal -> err ", err);
            setError(t("CS_FILE_UPLOAD_ERROR"));
          }
        }
      }
    })();
  }, [file]);

  return (
    <FormStep config={config} onSelect={handleSubmit} onSkip={onSkip} t={t}>
      <CardLabelDesc>{t(`PT_UPLOAD_RESTRICTIONS_TYPES`)}</CardLabelDesc>
      <CardLabelDesc>{t(`PT_UPLOAD_RESTRICTIONS_SIZE`)}</CardLabelDesc>
      <UploadFile
        accept=".jpg"
        onUpload={selectfile}
        onDelete={() => {
          setUploadedFile(null);
        }}
        message={uploadedFile ? `1 ${t(`CS_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`)}
      />
    </FormStep>
  );
};

export default Proof;
