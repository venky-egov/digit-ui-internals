import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardLabel,
  CardLabelDesc,
  CardSubHeader,
  ConnectingCheckPoints,
  CheckPoint,
  DisplayPhotos,
  MediaRow,
  LastRow,
  Row,
  StatusTable,
  PopUp,
  HeaderBar,
  ImageViewer,
  TextInput,
  TextArea,
  UploadFile,
  ButtonSelector,
  Toast,
} from "@egovernments/digit-ui-react-components";

import { Close } from "../../Icons";

const MapView = (props) => {
  return (
    <div onClick={props.onClick}>
      {/* <iframe
        width="600"
        height="450"
        frameBorder="0"
        style={{ border: 0 }}
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDdKOqX6EPEX9djPm-vL_8zv0HBF8z0Qjg&q=Space+Needle,Seattle+WA"></iframe> */}
      <img src="https://via.placeholder.com/640x280" />
    </div>
  );
};

const Heading = (props) => {
  return <h1 className="heading-m">{props.label}</h1>;
};

const CloseBtn = (props) => {
  return (
    <div className="icon-bg-secondary" onClick={props.onClick}>
      <Close />
    </div>
  );
};

export const ComplaintDetails = (props) => {
  let { id } = useParams();
  const [fullscreen, setFullscreen] = useState(false);
  const [imageZoom, setImageZoom] = useState(null);
  const [actionCalled, setActionCalled] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    console.log("action", props.action);
    setActionCalled(props.action);
  }, [props.action]);

  function zoomView() {
    setFullscreen(!fullscreen);
  }

  function close(state) {
    switch (state) {
      case fullscreen:
        setFullscreen(!fullscreen);
        break;
      case actionCalled:
        setActionCalled(!actionCalled);
        break;
      default:
        console.log(state);
        break;
    }
  }

  function zoomImage(imageSource) {
    setImageZoom(imageSource);
  }

  function onCloseImageZoom() {
    setImageZoom(null);
  }

  function onAssign() {
    setActionCalled(false);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  function closeToast() {
    setToast(false);
  }

  return (
    <React.Fragment>
      <Card>
        <CardSubHeader>Complaint Summary</CardSubHeader>
        <CardLabel>Complaint Details</CardLabel>
        <StatusTable>
          <Row label="complaint number" text={id} />
          <MediaRow label="Geolocation">
            <MapView onClick={zoomView} />
          </MediaRow>
          <LastRow label="landmark" text="SBI Bank" />
        </StatusTable>
        <DisplayPhotos
          srcs={["https://via.placeholder.com/150", "https://via.placeholder.com/150", "https://via.placeholder.com/150"]}
          onClick={zoomImage}
        />
      </Card>
      <Card>
        <ConnectingCheckPoints>
          <CheckPoint isCompleted={true} label="Pending For assignment" />
          <CheckPoint isCompleted={false} label="Complaint Filed" info="12/08/20 Naval Kishore" />
        </ConnectingCheckPoints>
      </Card>
      {fullscreen ? (
        <PopUp>
          <div className="popup-module">
            <HeaderBar main={<Heading label="Complaint Geolocation" />} end={<CloseBtn onClick={() => close(fullscreen)} />} />
            <div className="popup-module-main">
              <img src="https://via.placeholder.com/912x568" />
            </div>
          </div>
        </PopUp>
      ) : null}
      {imageZoom ? <ImageViewer imageSrc={imageZoom} onClose={onCloseImageZoom} /> : null}
      {actionCalled ? (
        <PopUp>
          <div className="popup-module">
            <HeaderBar main={<Heading label="Assign Complaint" />} end={<CloseBtn onClick={() => close(actionCalled)} />} />
            <div className="popup-module-main">
              <Card>
                <CardLabel>Employee Name</CardLabel>
                <TextInput />
                <CardLabel>Comments</CardLabel>
                <TextArea />
                <CardLabel>Supporting Documents</CardLabel>
                <CardLabelDesc>Only .jpg and .pdf files. 5 MB max file size.</CardLabelDesc>
                <UploadFile />
              </Card>
              <div className="popup-module-action-bar">
                <ButtonSelector theme="border" label="Cancel" />
                <ButtonSelector label="Assign" onSubmit={onAssign} />
              </div>
            </div>
          </div>
        </PopUp>
      ) : null}
      {toast && <Toast label="Complaint assigned successfully!" onClose={closeToast} />}
    </React.Fragment>
  );
};