document.getElementById('expressShipmentsQuantityInput').value = 0;
document.getElementById('sameDayShipmentsQuantityInput').value = 0;
document.getElementById('nextDayShipmentsQuantityInput').value = 0;
document.getElementById('assignedShipmentsQuantityInput').value = 0;

let rows = localStorage.getItem('serviceRegistry');

if (rows === null) {
  rows = [];
} else {
  rows = JSON.parse(rows);
}

rows.forEach((element) => addRow(element));

function addRow(row) {
  const tbody = document.getElementById('tableBody');
  const trCount = document.getElementsByTagName('tr').length;

  const tr = document.createElement('tr');

  const index_th = document.createElement('th');
  const index_text = document.createTextNode(`${trCount}`);

  index_th.appendChild(index_text);
  tr.appendChild(index_th);

  tbody.appendChild(tr);

  row.forEach((element) => {
    const th = document.createElement('th');
    const text = document.createTextNode(element);

    th.appendChild(text);
    tr.appendChild(th);
  });

  tbody.appendChild(tr);
}

const serviceCalculationsRegistry = {
  name: '',
  documentNumber: '',
  expressShipmentsQuantity: 0,
  sameDayShipmentsQuantity: 0,
  nextDayShipmentsQuantity: 0,
  assignedShipmentsQuantity: 0,
  total: 0,
};

function loadName(name) {
  serviceCalculationsRegistry.name = name.toUpperCase();
}

function loadDocumentNumber(documentNumber) {
  serviceCalculationsRegistry.documentNumber = documentNumber.toUpperCase();
}

function loadExpressShipmentsQuantity(expressShipmentsQuantity) {
  serviceCalculationsRegistry.expressShipmentsQuantity = Number(
    expressShipmentsQuantity
  );
}

function loadNextDayShipmentsQuantity(nextDayShipmentsQuantity) {
  serviceCalculationsRegistry.nextDayShipmentsQuantity = Number(
    nextDayShipmentsQuantity
  );
}

function loadSameDayShipmentsQuantity(sameDayShipmentsQuantity) {
  serviceCalculationsRegistry.sameDayShipmentsQuantity = Number(
    sameDayShipmentsQuantity
  );
}

function loadAssignedShipmentsQuantity(assignedShipmentsQuantity) {
  serviceCalculationsRegistry.assignedShipmentsQuantity = Number(
    assignedShipmentsQuantity
  );
}

function validate() {
  let errors = 0;

  document.getElementById('nameInputFeedback').style.display = 'none';
  document.getElementById('documentNumberInputFeedback').style.display = 'none';
  document.getElementById('serviceShipmentsInputFeedback').style.display =
    'none';

  let name = document.getElementById('nameInput').value;
  let documentNumber = document.getElementById('documentNumberInput').value;
  let expressShipmentsQuantity = document.getElementById(
    'expressShipmentsQuantityInput'
  ).value;
  let sameDayShipmentsQuantity = document.getElementById(
    'sameDayShipmentsQuantityInput'
  ).value;
  let nextDayShipmentsQuantity = document.getElementById(
    'nextDayShipmentsQuantityInput'
  ).value;
  let assignedShipmentsQuantity = document.getElementById(
    'assignedShipmentsQuantityInput'
  ).value;

  if (name === '') {
    document.getElementById('nameInputFeedback').style.display = 'block';
    errors++;
  }

  if (documentNumber === '') {
    document.getElementById('documentNumberInputFeedback').style.display =
      'block';
    errors++;
  }

  if (
    expressShipmentsQuantity === '' ||
    Number.isNaN(expressShipmentsQuantity)
  ) {
    document.getElementById('expressShipmentsQuantityInput').value = 0;
    serviceCalculationsRegistry.expressShipmentsQuantity = 0;
  }

  if (
    sameDayShipmentsQuantity === '' ||
    Number.isNaN(sameDayShipmentsQuantity)
  ) {
    document.getElementById('sameDayShipmentsQuantityInput').value = 0;
    serviceCalculationsRegistry.sameDayShipmentsQuantity = 0;
  }

  if (
    nextDayShipmentsQuantity === '' ||
    Number.isNaN(nextDayShipmentsQuantity)
  ) {
    document.getElementById('nextDayShipmentsQuantityInput').value = 0;
    serviceCalculationsRegistry.nextDayShipmentsQuantity = 0;
  }

  if (
    assignedShipmentsQuantity === '' ||
    Number.isNaN(assignedShipmentsQuantity)
  ) {
    document.getElementById('assignedShipmentsQuantityInput').value = 0;
    serviceCalculationsRegistry.assignedShipmentsQuantity = 0;
  }

  if (
    serviceCalculationsRegistry.expressShipmentsQuantity === 0 &&
    serviceCalculationsRegistry.sameDayShipmentsQuantity === 0 &&
    serviceCalculationsRegistry.nextDayShipmentsQuantity === 0 &&
    serviceCalculationsRegistry.assignedShipmentsQuantity === 0
  ) {
    document.getElementById('serviceShipmentsInputFeedback').style.display =
      'block';
    errors++;
  }

  return errors === 0;
}

function calculatePrice() {
  if (!validate()) {
    return;
  }

  const {
    expressShipmentsQuantity,
    sameDayShipmentsQuantity,
    nextDayShipmentsQuantity,
    assignedShipmentsQuantity,
  } = serviceCalculationsRegistry;

  serviceCalculationsRegistry.expressShipmentsQuantity =
    5 * expressShipmentsQuantity;

  serviceCalculationsRegistry.sameDayShipmentsQuantity =
    4 * sameDayShipmentsQuantity;

  serviceCalculationsRegistry.nextDayShipmentsQuantity =
    3 * nextDayShipmentsQuantity;

  serviceCalculationsRegistry.assignedShipmentsQuantity =
    2 * assignedShipmentsQuantity;

  const total =
    5 * expressShipmentsQuantity +
    4 * sameDayShipmentsQuantity +
    3 * nextDayShipmentsQuantity +
    2 * assignedShipmentsQuantity;

  serviceCalculationsRegistry.total = total;

  let row = Object.values(serviceCalculationsRegistry);
  localStorage.setItem('serviceRegistry', JSON.stringify([...rows, row]));
  addRow(row);
}
