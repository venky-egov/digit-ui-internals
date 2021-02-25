import React from "react";
import PropTypes from "prop-types";

const KeyNote = ({ keyValue, note, caption, noteStyle }) => {
  return (
    <div className="key-note-pair">
      <h3>{keyValue}</h3>
      <p style={noteStyle}>{note}</p>
      <p className="caption">{caption}</p>
    </div>
  );
};

KeyNote.propTypes = {
  keyValue: PropTypes.string,
  note: PropTypes.string || PropTypes.number,
  noteStyle: PropTypes.any,
};

KeyNote.defaultProps = {
  keyValue: "",
  note: "",
  noteStyle: {},
};

export default KeyNote;
