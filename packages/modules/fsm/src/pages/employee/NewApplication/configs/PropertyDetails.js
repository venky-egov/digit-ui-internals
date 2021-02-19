import { Dropdown, Loader } from "@egovernments/digit-ui-react-components";

const PropertyDetails = (t) => {
  const { isLoading: loadingProperty, data: propertyTypesData } = Digit.Hooks.fsm.useMDMS(state, "FSM", "PropertyType");
  const { isLoading: loadingSubProperty, data: propertySubTypeMenu } = Digit.Hooks.fsm.useMDMS(state, "FSM", "PropertySubtype", { select });

  const [propertyType, setPropertyType] = useState();
  const [subProperty, setSubProperty] = useState();

  return {
    head: t("ES_NEW_APPLICATION_PROPERTY_DETAILS"),
    body: [
      {
        label: t("ES_NEW_APPLICATION_PROPERTY_TYPE"),
        isMandatory: true,

        populators: loadingProperty ? (
          <Loader />
        ) : (
          <Dropdown id="propertyType" selected={propertyType} select={setPropertyType} option={propertyTypesData} optionKey="i18nKey" t={t} />
        ),
      },
      {
        label: t("ES_NEW_APPLICATION_PROPERTY_SUB-TYPE"),
        isMandatory: true,
        populators: loadingSubProperty ? (
          <Loader />
        ) : (
          <Dropdown id="propertySubType" selected={subProperty} select={setSubProperty} option={propertySubTypeMenu} t={t} optionKey="i18nKey" />
        ),
      },
    ],
  };
};

export default PropertyDetails;
