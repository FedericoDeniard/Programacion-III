export const fillTable = (headers, data, tableHead, tableBody) => {
  const tableHeadRow = document.createElement("tr");
  headers.forEach((header) => {
    const th = document.createElement("th");
    let textCapitalized = header.charAt(0).toUpperCase() + header.slice(1);
    th.textContent = textCapitalized;
    tableHeadRow.appendChild(th);
  });
  tableHead.appendChild(tableHeadRow);

  data.forEach((person) => {
    const tableRow = document.createElement("tr");
    headers.forEach((header) => {
      const td = document.createElement("td");
      td.textContent = person[header];
      tableRow.appendChild(td);
    });
    tableBody.appendChild(tableRow);
  });
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
