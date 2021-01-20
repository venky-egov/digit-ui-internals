import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  BreakLine,
  Card,
  CardLabel,
  CardSubHeader,
  CardSectionHeader,
  TextArea,
  TextInput,
  ActionBar,
  SubmitBar,
  LabelFieldPair,
} from "@egovernments/digit-ui-react-components";

import { useTranslation } from "react-i18next";

export const FormComposer = (props) => {
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation();

  function onSubmit(data) {
    props.onSubmit(data);
  }

  const fieldSelector = (type, populators) => {
    switch (type) {
      case "text":
        return (
          <div className="field-container">
            {populators.componentInFront ? populators.componentInFront : null}
            <TextInput className="field" {...populators} inputRef={register(populators.validation)} />
          </div>
        );
      case "textarea":
        return <TextArea className="field" {...populators} inputRef={register(populators.validation)} />;
      default:
        return populators.dependency !== false ? populators : null;
    }
  };

  const formFields = useMemo(
    () =>
      props.config?.map((section, index, array) => {
        return (
          <React.Fragment key={index}>
            <CardSectionHeader>{section.head}</CardSectionHeader>
            {section.body.map((field, index) => {
              return (
                <LabelFieldPair key={index}>
                  {field.label && (
                    <CardLabel>
                      {field.label}
                      {field.isMandatory ? " * " : null}
                    </CardLabel>
                  )}
                  <div className="field">{fieldSelector(field.type, field.populators)}</div>
                </LabelFieldPair>
              );
            })}
            {array.length - 1 === index ? null : <BreakLine />}
          </React.Fragment>
        );
      }),
    [props.config]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardSubHeader>{props.heading}</CardSubHeader>
        {formFields}
        {props.children}
        <ActionBar>
          <SubmitBar label={t(props.label)} submit="submit" />
        </ActionBar>
      </Card>
    </form>
  );
};
