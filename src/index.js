document.addEventListener('DOMContentLoaded', () => {
  fetchDogs();
});

function fetchDogs() {
  fetch('http://localhost:3000/dogs')
    .then((res) => res.json())
    .then((dogs) =>
      dogs.forEach((dog) => {
        renderDogs(dog);
        editDogs(dog);
      })
    );
}

function patchDogs(dog) {
  fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(dog),
  }).then((res) => res.json());
}

function renderDogs(dog) {
  const tableBody = document.querySelector('#table-body');
  const tableRow = document.createElement('tr');
  tableRow.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button id='edit'>Edit</button></td>
    `;
  tableBody.prepend(tableRow);
}

function editDogs(dog) {
  const editBtn = document.getElementById('edit');
  const editForm = document.querySelector('#dog-form');
  editBtn.addEventListener('click', () => {
    editForm.name.value = dog.name;
    editForm.breed.value = dog.breed;
    editForm.sex.value = dog.sex;

    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      dog.name = e.target.name.value;
      dog.breed = e.target.breed.value;
      dog.sex = e.target.sex.value;
      patchDogs(dog);
    });
  });
}
