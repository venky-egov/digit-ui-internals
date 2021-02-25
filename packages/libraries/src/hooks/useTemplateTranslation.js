import { useTranslation } from "react-i18next";

function replaceLiterals(test, dynamicValues = {}) {
  let returnText = test;
  Object.keys(dynamicValues).forEach((key) => {
    returnText = returnText.replace(`{${key.toUpperCase()}}`, dynamicValues[key]);
  });
  return returnText;
}

export const useTemplateTranslations = () => {
  const { t } = useTranslation();
  const tt = (textKey, dynamicValues) => replaceLiterals(t(textKey), dynamicValues);
  return { tt };
};
