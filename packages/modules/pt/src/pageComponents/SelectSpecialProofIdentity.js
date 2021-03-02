import React, { useState, useEffect } from "react";
import { FormStep, UploadFile, CardLabelDesc } from "@egovernments/digit-ui-react-components";

const SelectSpecialProofIdentity = ({ t, config, onSelect, userType, formData }) => {
  let index = 0;
  const [uploadedFile, setUploadedFile] = useState(formData?.SelectSpecialProofIdentity?.specialProofIdentity?.fileStoreId || null);
  const [file, setFile] = useState(formData?.SelectSpecialProofIdentity?.specialProofIdentity);
  const [error, setError] = useState(null);
  const cityDetails = Digit.ULBService.getCurrentUlb();
  const handleSubmit = () => {
    let fileStoreId = uploadedFile;
    let fileDetails = file;
    if(fileDetails) fileDetails.fileStoreId = fileStoreId ? fileStoreId : null;
    onSelect(config.key, { specialProofIdentity: fileDetails });
  };
  const onSkip = () => onSelect();

  useEffect(() => {
    if (formData.owners && formData.owners[index] && formData.owners[index].ownerType.code === "NONE") onSelect(config.key, {}, true);
  }, [formData.owners && formData.owners[index] && formData.owners[index].ownerType.code]);


  function selectfile(e) {
    setFile(e.target.files[0]);
  }
  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        if (file.size >= 5242880) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            // TODO: change module in file storage
            const response = await Digit.UploadServices.Filestorage("property-upload", file, "pb");
            if (response?.data?.files?.length > 0) {
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("PT_FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
            console.error("Modal -> err ", err);
            setError(t("PT_FILE_UPLOAD_ERROR"));
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
        message={uploadedFile ? `1 ${t(`PT_ACTION_FILEUPLOADED`)}` : t(`PT_ACTION_NO_FILEUPLOADED`)}
      />
      <CardLabelDesc>{" "}</CardLabelDesc>
    </FormStep>
  );
};

export default SelectSpecialProofIdentity;
