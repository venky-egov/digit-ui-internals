import React from "react";
import Card from "../atoms/Card";
import KeyNote from "../atoms/KeyNote";
import SubmitBar from "../atoms/SubmitBar";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

const ResponseComposer = ({ data, template, actionButtonLabel }) => {
  const { t } = useTranslation();
  console.log({ data, template, actionButtonLabel });
  return (
    <div>
      {data.map((result) => {
        return (
          <Card style={{ boxShadow: "none" }}>
            {template.map((field) => {
              return (
                <KeyNote
                  keyValue={t(field.label)}
                  note={field.notePrefix ? field.notePrefix + result[field.key] : result[field.key]}
                  noteStyle={field.noteStyle}
                />
              );
            })}
            {actionButtonLabel && <SubmitBar label={t(actionButtonLabel)} />}
          </Card>
        );
      })}
    </div>
  );
};

ResponseComposer.propTypes = {
  data: PropTypes.array,
  template: PropTypes.array,
  actionButtonLabel: PropTypes.string,
};

ResponseComposer.defaultProps = {
  data: [],
  template: [],
  actionButtonLabel: "",
};

export default ResponseComposer;
