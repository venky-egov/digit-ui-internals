import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, Route, BrowserRouter as Router, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { TypeSelectCard } from "@egovernments/digit-ui-react-components";
import { config } from "./config";
import SelectPropertyType from "./SelectPropertyType";
import SelectPropertySubType from "./SelectPropertySubType";

const FileComplaint = () => {
  const { path, url } = useRouteMatch();
  const { t } = useTranslation();
  const history = useHistory();

  const stepItems = useMemo(
    () =>
      config.map((step, index) => {
        const texts = {};
        for (const key in step.texts) {
          texts[key] = t(step.texts[key]);
        }
        return { ...step, texts };
      }),
    [config]
  );

  function onSelectPropertyType(data) {
    history.push(`${path}/property-sub-type`);
  }

  function onSelectPropertySubType(data) {
    history.push(`${path}/property-sub-type`);
  }

  return (
    <Switch>
      <Route exact path={`${path}/`}>
        <SelectPropertyType config={stepItems[0]} onSelect={onSelectPropertyType} t={t} />
      </Route>
      <Route path={`${path}/property-sub-type`}>
        <SelectPropertySubType config={stepItems[1]} onSelect={onSelectPropertySubType} t={t} />
      </Route>
    </Switch>
  );
};

export default FileComplaint;
