import React from "react";

const AppContainer = (props) => {
  return (
    <div className="app-container" style={props.style}>
      {props.children}
    </div>
  );
};

export default AppContainer;
