export const getPropertyTypeLocale = (value) => {
  return `PROPERTYTYPE_MASTERS_${value?.split(".")[0]}`;
};

export const getPropertySubtypeLocale = (value) => `PROPERTYTYPE_MASTERS_${value}`;

export const getFixedFilename=(filename='',size=5)=>{
  if(filename.length<=size){
return filename;
  }
  return `${filename.substr(0,size)}...`;
}
