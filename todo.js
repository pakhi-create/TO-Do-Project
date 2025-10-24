const submitBtn = document.getElementById("submitBtn");
const tableSection = document.getElementById("tableSection");
const tbody = document.querySelector("#taskTable tbody");

submitBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const polytechnic = document.getElementById("polytechnic").value.trim();
  const classNo = document.getElementById("classNo").value.trim();
  const classDate = document.getElementById("classDate").value;
  const tools = document.getElementById("tools").value.trim();
  const workDetails = document.getElementById("workDetails").value.trim();
  const remarks = document.getElementById("remarks").value.trim();

  if (!name || !polytechnic || !classNo || !classDate || !tools || !workDetails || !remarks) {
    alert("Please fill all fields!");
    return;
  }

  tableSection.classList.remove("hidden");
  tableSection.classList.add("show");

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${name}</td>
    <td>${polytechnic}</td>
    <td>${classNo}</td>
    <td>${classDate}</td>
    <td>${tools}</td>
    <td>${workDetails}</td>
    <td>${remarks}</td>
    <td class="action-btns">
      <button class="insertBtn">Insert</button>
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
    </td>
  `;
  tbody.appendChild(row);

  ["name", "polytechnic", "classNo", "classDate", "tools", "workDetails", "remarks"].forEach(
    (id) => (document.getElementById(id).value = "")
  );

  addRowFunctions(row);
});

function addRowFunctions(row) {
  const insertBtn = row.querySelector(".insertBtn");
  const editBtn = row.querySelector(".editBtn");
  const deleteBtn = row.querySelector(".deleteBtn");

  insertBtn.addEventListener("click", () => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td class="action-btns">
        <button class="insertBtn">Insert</button>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </td>
    `;
    row.insertAdjacentElement("afterend", newRow);
    addRowFunctions(newRow);
  });

  editBtn.addEventListener("click", () => {
    const cells = row.querySelectorAll("td:not(.action-btns)");
    cells.forEach((cell) => (cell.contentEditable = true));
    editBtn.textContent = "Save";
    editBtn.style.background = "#ff9800";

    editBtn.onclick = () => {
      cells.forEach((cell) => (cell.contentEditable = false));
      editBtn.textContent = "Edit";
      editBtn.style.background = "#4caf50";
      addRowFunctions(row);
    };
  });

  deleteBtn.addEventListener("click", () => {
    row.remove();
    if (!tbody.hasChildNodes()) {
      tableSection.classList.add("hidden");
      tableSection.classList.remove("show");
    }
  });
}