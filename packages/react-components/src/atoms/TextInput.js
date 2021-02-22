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
          className={`${user_type ? "employee-card-input-error" : "card-input-error"} ${props.disable && "disabled"}`}
          placeholder={props.placeholder}
          onChange={props.onChange}
          ref={props.inputRef}
          value={props.value}
          style={{ ...props.style }}
          defaultValue={props.defaultValue}
          minLength={props.minlength}
          maxLength={props.maxlength}
          max={props.max}
          pattern={props.pattern}
          min={props.min}
        />
      ) : (
        <input
          type={props.type || "text"}
          name={props.name}
          className={`${user_type ? "employee-card-input" : "card-input"} ${props.disable && "disabled"}`}
          placeholder={props.placeholder}
          onChange={props.onChange}
          ref={props.inputRef}
          value={props.value}
          style={{ ...props.style }}
          defaultValue={props.defaultValue}
          minLength={props.minlength}
          maxLength={props.maxlength}
          max={props.max}
          required={props.isRequired}
          pattern={props.pattern}
          min={props.min}
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
