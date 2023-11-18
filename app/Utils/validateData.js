export const validateAndLogData = (data, context) => {
  if (data === null || data === undefined) {
    console.error(`Data is empty in ${context}`);
    return null;
  }
  console.log(`Data received in ${context}`, { data });
  return data;
};
