import React, { useState } from "react";
import { FormStep, CardLabel, RadioButtons } from "@egovernments/digit-ui-react-components";

const ProvideSubUsageTypeOfRentedArea = ({ t, config, onSelect, userType, formData }) => {
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const stateId = tenantId.split(".")[0];
    const [selfOccupied, setSelfOccupied] = useState(formData?.IsThisFloorSelfOccupied);
    const { data: Menu, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OwnerType");

    const data = [
        {
            i18nKey: "Retail"
        },
        {
            i18nKey: "Medical"
        },
        {
            i18nKey: "Stationary"
        },
        {
            i18nKey: "Other"
        }
    ];
    const onSkip = () => onSelect();

    function selectSelfOccupied(value) {
        setSelfOccupied(value);
    }

    function goNext() {
        onSelect(config.key, selfOccupied);
    }
    return (
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!selfOccupied}>
            <CardLabel>{t("Types of Floor Usage")}</CardLabel>
            <RadioButtons
                t={t}
                optionsKey="i18nKey"
                isMandatory={config.isMandatory}
                options={data}
                selectedOption={selfOccupied}
                onSelect={selectSelfOccupied}
            />
        </FormStep>
    );
};

export default ProvideSubUsageTypeOfRentedArea;