import React from "react";

export const CustomCard = (props) => {
  return (
    <div className="custom-card-class">
      <h1>Custom card</h1>
      <h1>{props.name}</h1>
      <input name="color" type="text"></input>
    </div>
  );
};
