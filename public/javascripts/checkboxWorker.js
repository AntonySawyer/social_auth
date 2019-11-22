let mainCheckboxState = false;

const mainCheckbox = document.getElementById('mainCheckbox');
const allValuedCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#mainCheckbox)');

mainCheckbox.addEventListener('click', changeAllCheckboxes);
allValuedCheckboxes.forEach(el => el.addEventListener('change', changeMainCheckbox));

function changeMainCheckbox(e) {
  const ids = getChecked();
  if (mainCheckboxState && allValuedCheckboxes.length != ids.length && ids.length != 0) {
    mainCheckbox.indeterminate = true;
  }
}

function changeAllCheckboxes() {
  allValuedCheckboxes.forEach(el => el.checked = mainCheckbox.checked);
  mainCheckboxState = mainCheckbox.checked;
}

function getChecked() {
  const ids = []
  document.querySelectorAll('input[type="checkbox"]:checked:not(#mainCheckbox)').forEach(el =>
    ids.push(el.id));
  return ids;
}

function sendIds(path) {
  const ids = getChecked();
  if (ids.length != 0) {
    fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(ids)
    });
    allValuedCheckboxes.forEach(el => el.checked = false);
    location.reload();
  }
}