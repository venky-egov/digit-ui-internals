import React from "react";
import PropTypes from "prop-types";

const TextInput = (props) => {
  const user_type = Digit.SessionStorage.get("userType");
  return (
    <React.Fragment>
      {props.isMandatory ? (
        <input
          type={props.type || "text"}
          name={props.name}
          className={user_type ? "employee-card-input-error" : "card-input-error"}
          placeholder={props.placeholder}
          onChange={props.onChange}
          ref={props.inputRef}
          value={props.value}
          defaultValue={props.defaultValue}
          minLength={props.minlength}
          maxLength={props.maxlength}
        />
      ) : (
        <input
          type={props.type || "text"}
          name={props.name}
          className={user_type ? "employee-card-input" : "card-input"}
          placeholder={props.placeholder}
          onChange={props.onChange}
          ref={props.inputRef}
          value={props.value}
          style={{ ...props.style }}
          defaultValue={props.defaultValue}
          minLength={props.minlength}
          maxLength={props.maxlength}
        />
      )}
    </React.Fragment>
  );
};

TextInput.propTypes = {
  userType: PropTypes.string,
  isMandatory: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  ref: PropTypes.func,
  value: PropTypes.any,
};

TextInput.defaultProps = {
  isMandatory: false,
};

export default TextInput;
