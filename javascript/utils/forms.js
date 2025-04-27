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

export const cleanData = (data, objectType) => {
  const allowedKeys = objectType;
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedKeys.includes(key))
  );
};

export const fillFormValues = (data, form) => {
  const elements = form.elements;
  for (let el of elements) {
    if (!el.name) continue;

    if (el.name === "type") {
      el.value = data.hasOwnProperty("equipo") ? "Futbolista" : "Profesional";
      continue;
    }
    el.value = data[el.name];
  }
};
