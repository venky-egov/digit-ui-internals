export const getPropertyTypeLocale = (value) => {
  return `PROPERTYTYPE_MASTERS_${value.split(".")[0]}`;
};

export const getPropertySubtypeLocale = (value) => `PROPERTYTYPE_MASTERS_${value}`;
