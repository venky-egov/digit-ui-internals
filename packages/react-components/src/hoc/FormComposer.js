import React, { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import BreakLine from "../atoms/BreakLine";
import Card from "../atoms/Card";
import CardLabel from "../atoms/CardLabel";
import CardSubHeader from "../atoms/CardSubHeader";
import CardSectionHeader from "../atoms/CardSectionHeader";
import TextArea from "../atoms/TextArea";
import TextInput from "../atoms/TextInput";
import ActionBar from "../atoms/ActionBar";
import SubmitBar from "../atoms/SubmitBar";
import LabelFieldPair from "../atoms/LabelFieldPair";

import { useTranslation } from "react-i18next";

export const FormComposer = (props) => {
  const { register, handleSubmit, setValue, watch, control, formState } = useForm({ defaultValues: props.defaultValues });
  const { t } = useTranslation();

  const formData = watch();

  function onSubmit(data) {
    props.onSubmit(data);
  }

  function onSecondayActionClick(data) {
    props.onSecondayActionClick();
  }

  useEffect(() => {
    props.onFormValueChange && props.onFormValueChange(formData, formState);
  }, [formData]);

  const fieldSelector = (type, populators, isMandatory, disable = false) => {
    switch (type) {
      case "text":
      case "date":
      case "password":
        if (populators.defaultValue) setTimeout(setValue(populators.name, populators.defaultValue));
        return (
          <div
            className="field-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {populators.componentInFront ? (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={disable && "disabled"}
              >
                {populators.componentInFront}
              </span>
            ) : null}
            <TextInput
              className="field"
              {...populators}
              inputRef={register(populators.validation)}
              isRequired={isMandatory}
              type={type}
              disabled={disable}
            />
          </div>
        );
      case "textarea":
        if (populators.defaultValue) setTimeout(setValue(populators.name, populators.defaultValue));
        return <TextArea className="field" {...populators} inputRef={register(populators.validation)} disable={props.disable} />;
      case "custom":
        return (
          <Controller
            render={(props) => populators.component({ ...props, setValue }, populators.customProps)}
            defaultValue={populators.defaultValue}
            name={populators.name}
            control={control}
          />
        );
      default:
        return populators.dependency !== false ? populators : null;
    }
  };

  const formFields = useMemo(
    () =>
      props.config?.map((section, index, array) => {
        return (
          <React.Fragment key={index}>
            {section.head && <CardSectionHeader id={section.headId}>{section.head}</CardSectionHeader>}
            {section.body.map((field, index) => {
              if (props.inline)
                return (
                  <React.Fragment>
                    {!field.withoutLabel && (
                      <CardLabel style={{ marginBottom: props.inline ? "8px" : "revert" }} className={field?.disable ? "disabled" : ""}>
                        {field.label}
                        {field.isMandatory ? " * " : null}
                      </CardLabel>
                    )}
                    <div style={field.withoutLabel ? { width: "100%" } : {}} className="field">
                      {fieldSelector(field.type, field.populators, field.isMandatory, field?.disable)}
                    </div>
                  </React.Fragment>
                );
              return (
                <LabelFieldPair key={index}>
                  {!field.withoutLabel && (
                    <CardLabel style={{ marginBottom: props.inline ? "8px" : "revert" }} className={field?.disable ? "disabled" : ""}>
                      {field.label}
                      {field.isMandatory ? " * " : null}
                    </CardLabel>
                  )}
                  <div style={field.withoutLabel ? { width: "100%" } : {}} className="field">
                    {fieldSelector(field.type, field.populators, field.isMandatory, field?.disable)}
                  </div>
                </LabelFieldPair>
              );
            })}
            {!props.noBreakLine && (array.length - 1 === index ? null : <BreakLine />)}
          </React.Fragment>
        );
      }),
    [props.config]
  );

  const getCardStyles = () => {
    let styles = props.cardStyle || {};
    if (props.noBoxShadow) styles = { ...styles, boxShadow: "none" };
    return styles;
  };

  const isDisabled = props.isDisabled || false;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card style={getCardStyles()}>
        {!props.childrenAtTheBottom && props.children}
        {props.heading && <CardSubHeader style={{ ...props.headingStyle }}> {props.heading} </CardSubHeader>}
        {formFields}
        {props.childrenAtTheBottom && props.children}
        {props.submitInForm && <SubmitBar label={t(props.label)} submit="submit" style={{ width: "100%" }} />}
        {props.secondaryActionLabel && (
          <div className="primary-label-btn" style={{ margin: "20px auto 0 auto" }} onClick={onSecondayActionClick}>
            {props.secondaryActionLabel}
          </div>
        )}
        {!props.submitInForm && props.label && (
          <ActionBar>
            <SubmitBar label={t(props.label)} submit="submit" disabled={isDisabled} />
          </ActionBar>
        )}
      </Card>
    </form>
  );
};
