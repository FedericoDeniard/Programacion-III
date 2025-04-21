export const fillTable = (
  headers,
  data,
  tableHead,
  tableBody,
  hiddenKeys = [],
  canEdit = false
) => {
  const tableHeadRow = document.createElement("tr");
  const publicHeaders = hiddenValues(headers, hiddenKeys);
  publicHeaders.forEach((header) => {
    const th = document.createElement("th");
    let textCapitalized = header.charAt(0).toUpperCase() + header.slice(1);
    th.textContent = textCapitalized;
    tableHeadRow.appendChild(th);
  });
  tableHead.appendChild(tableHeadRow);

  data.forEach((person) => {
    const tableRow = document.createElement("tr");
    publicHeaders.forEach((header) => {
      const td = document.createElement("td");
      td.textContent = person[header] || "N/A";
      tableRow.appendChild(td);
    });
    if (canEdit) {
      // Delete
      const td = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.id = `delete-${person.id}`;
      deleteButton.textContent = "Eliminar";
      deleteButton.classList.add("button", "--red");
      td.appendChild(deleteButton);
      tableRow.appendChild(td);

      // Edit
      const editTD = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.id = `edit-${person.id}`;
      editButton.textContent = "Editar";
      editButton.value = person.id;
      editButton.classList.add("button", "--yellow");
      editTD.appendChild(editButton);
      tableRow.appendChild(editTD);
    }
    tableBody.appendChild(tableRow);
  });
};

export const clearTable = (tableHead, tableBody) => {
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";
};

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

const hiddenValues = (headers, hiddenKeys) => {
  const newHeaders = Array.from(headers).filter(
    (header) => !hiddenKeys.includes(header)
  );
  return newHeaders;
};
