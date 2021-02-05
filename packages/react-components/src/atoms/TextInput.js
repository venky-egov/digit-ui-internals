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
          disabled={props.disable}
          style={{ borderColor: props.disable ? "#ccc" : "black", color: props.disable ? "#ccc" : "revert" }}
          defaultValue={props.defaultValue}
          minLength={props.minlength}
          maxLength={props.maxlength}
          disabled={props.disabled}
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
          style={{ ...props.style, borderColor: props.disable ? "#ccc" : "black", color: props.disable ? "#ccc" : "revert" }}
          disabled={props.disable}
          defaultValue={props.defaultValue}
          minLength={props.minlength}
          maxLength={props.maxlength}
          disabled={props.disabled}
          required={props.isRequired}
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
