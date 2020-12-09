import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { TypeSelectCard } from "@egovernments/digit-ui-react-components";
import useComplaintTypes from "../../../../hooks/useComplaintTypes";
import { PgrStoreService } from "../../_REDUX/service";

const SelectComplaintType = ({ config, onSelect }) => {
  const goNext = () => {
    onSelect(complaintType);
  };
  const __initComplaintType__ = Digit.SessionStorage.get("complaintType");
  const [complaintType, setComplaintType] = useState(__initComplaintType__ ? __initComplaintType__ : {});
  const textParams = config.texts;
  const SessionStorage = Digit.SessionStorage;
  const menu = useComplaintTypes({ stateCode: "pb.amritsar" });

  PgrStoreService.dispatchAsynchronously();

  function selectedValue(value) {
    setComplaintType(value);
    SessionStorage.set("complaintType", value);
  }

  return (
    <TypeSelectCard
      {...textParams}
      {...{ menu: menu }}
      {...{ optionsKey: "name" }}
      {...{ selected: selectedValue }}
      {...{ selectedOption: complaintType }}
      {...{ onSave: goNext }}
    />
  );
};

// const mapStateToProps = (state) => {
//   console.log(state);
//   return {
//     pgr: state.PGR,
//   };
// };

export default SelectComplaintType;
