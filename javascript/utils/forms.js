export const getFormValues = (form) => {
  const data = {};
  const elements = form.elements;

  for (let el of elements) {
    if (!el.name) continue;

    let value = el.value;

    if (el.type === "number") {
      value = Number(value);
    } else if (el.type === "checkbox") {
      value = el.checked;
    }

    data[el.name] = value;
  }

  return data;
};

export const cleanData = (object) => {
  return Object.fromEntries(
    Object.entries(object).filter(([key, value]) => value !== "")
  );
};
