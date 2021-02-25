export const newConfig = [
    {
      head: "ES_NEW_APPLICATION_PROPERTY_DETAILS",
      body: [
        {
          type: "component",
          route: "owner-ship-details",
          isMandatory: true,
          component: "SelectOwnerShipDetails",
          texts: {
            headerCaption: "PT_PROPERTIE_S_OWNERSHIP",
            header: "PT_PROVIDE_OWNERSHI_DETAILS",
            cardText: "PT_PROVIDE_OWNERSHI_DETAILS_SUB_TEXT",
            submitBarLabel: "CS_COMMON_NEXT",
          },
          key: "owner-ship-details",
          withoutLabel: true,
          nextStep: "owner-details",
          hideInEmployee: true,
        },
        {
          label: "ES_NEW_APPLICATION_PROPERTY_TYPE", 
          isMandatory: true,
          type: "component",
          route: "owner-details",
          key: "owner-details",
          component: "SelectOwnerDetails",
          texts: {
            headerCaption: "",
            header: "PT_ASSESMENT_INFO_SUB_HEADER",
            cardText: "PT_FORM3_HEADER_MESSAGE",
            submitBarLabel: "CS_COMMON_NEXT",
          },
          nextStep: "special-owner-category",
        },
        {
          type: "component",
          route: "special-owner-category",
          isMandatory: true,
          component: "SelectSpecialOwnerCategoryType",
          texts: {
            headerCaption: "PT_OWNERS_DETAILS",
            header: "PT_SPECIAL_OWNER_CATEGORY",
            cardText: "PT_FORM3_HEADER_MESSAGE",
            submitBarLabel: "CS_COMMON_NEXT",
          },
          key: "special-owner-category",
          withoutLabel: true,
          nextStep: "slum-details",
          hideInEmployee: true,
        },
        
      ],
    }
  ];