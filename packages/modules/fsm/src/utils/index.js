export const getPropertyTypeLocale = (value) => {
  return `PROPERTYTYPE_MASTER_${value.split(".")[0]}`;
};

export const getPropertySubtypeLocale = (value) => `PROPERTYTYPE_MASTER_${value}`;
