import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardCaption, CardHeader, CardText, SubmitBar, UploadFile } from "@egovernments/digit-ui-react-components";

const Proof = () => {
  //const { t } = useTranslation();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState(null);
  function selectfile(e) {
    setFile(e.target.files[0]);
  }
  return (
    <React.Fragment>
      <Card>
        <CardCaption>Property's Location</CardCaption>
        <CardHeader>Proof of Address</CardHeader>
        <CardText>Adhaar Card, Voter ID, Driving License</CardText>
        <CardText>FileType: jpg,PNG OR PDF(less than 2MB)</CardText>
        <UploadFile
          accept=".jpg"
          onUpload={selectfile}
          onDelete={() => {
            setUploadedFile(null);
          }}
          message={uploadedFile ? "File uploaded" : "File not uploaded"}
        />

        <SubmitBar label="Next"></SubmitBar>
      </Card>
    </React.Fragment>
  );
};

export default Proof;
