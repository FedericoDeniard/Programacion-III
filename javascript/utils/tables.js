export const getHeadersFromArray = (data) => {
  if (!Array.isArray(data)) throw new Error("Input must be an array");
  if (data.length === 0) throw new Error("Input cannot be empty");
  return data.reduce((acc, obj, index) => {
    if (typeof obj !== "object")
      throw new Error(`Input at index ${index} is not an object`);
    Object.keys(obj).forEach((key) => acc.add(key));
    return acc;
  }, new Set());
};

export const hiddenValues = (headers, hiddenKeys) => {
  const newHeaders = Array.from(headers).filter(
    (header) => !hiddenKeys.includes(header)
  );
  return newHeaders;
};
