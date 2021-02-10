const useQueryParams = (key) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(key);
};

export default useQueryParams;
