export const createModal = (child) => {
  const modal = document.createElement("dialog");
  child.classList.remove("hidden");
  modal.classList.add("modal");
  modal.setAttribute("closedby", "any");
  modal.appendChild(child);
  document.body.appendChild(modal);

  const closeButton = document.createElement("input");
  closeButton.type = "button";
  closeButton.value = "Close";
  closeButton.classList.add("button", "--red");
  child.appendChild(closeButton);

  closeButton.addEventListener("click", () => {
    modal.close();
  });

  return { modal, closeButton };
};
