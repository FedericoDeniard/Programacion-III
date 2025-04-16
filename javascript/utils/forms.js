export const getFormValues = (form) => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  return data;
};
