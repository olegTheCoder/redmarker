const $searchEmailuser = document.forms.searchEmailuser;
const $infoUsers = document.querySelector('[data-info]');
const $titleUsers = document.querySelector('[data-title]');
const $tableRes = document.querySelector('[data-table]');
const $roleUser = document.querySelector('[data-role]');
const $butName = document.querySelector('[data-butName]');
const $check = document.querySelector('.form-check-input');

function insertInfo(url, result, createdAt) {
  return `
  <tr class="del">
  <th scope="row">${createdAt}</th>
<td>${url}</td>
  <td>${result}</td>
</tr>`;
}

$searchEmailuser?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const emailInputs = Object.fromEntries(new FormData($searchEmailuser));
  const response = await fetch('/lk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailInputs),
  });
  const data = await response.json();
  const { findUser } = data;
  const { listSearch } = data;
  $titleUsers.innerText = 'Данные пользователя';
  $infoUsers.innerText = `
  Имя: ${findUser.first_name}    
  Фамилия: ${findUser.last_name}
  `;
  $butName.innerText = 'Роль администратора?';
  $roleUser.style.display = 'inherit';
  if (findUser.isadmin) {
    $check.checked = true;
  } else {
    $check.checked = false;
  }
  $check.id = findUser.id;

  while ($tableRes.firstChild) {
    $tableRes.removeChild($tableRes.firstChild);
  }
  listSearch.map((el) => $tableRes.insertAdjacentHTML('beforeend', insertInfo(el.url, el.result, el.createdAt)));
});

$check?.addEventListener('click', async (event) => {
  event.preventDefault();
  const checkActive = $check.checked;
  const response = await fetch('/lk', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: $check.id,
      isadmin: checkActive,
    }),
  });
  const data = await response.json();
  const { isadmin } = data;
  $check.checked = isadmin;
  console.log(data);
});

// HOMEPAGE
const $urlForm = document.forms.urlForm;

function insertCard({ id, url, result, fine }) {
  return `<div data-allSearch class="container d-flex justify-content-center my-50">
  
    <div data-postid=${id} class='card my-2' style="width: 50em;">
    <div>
    Адрес сайта: ${url} <br>
    Статус: ${result} <br>
    ${fine}
    </div>
    </div>
    </div>`;
}

$urlForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const urlInputs = Object.fromEntries(new FormData($urlForm));
  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(urlInputs),
  });
  const data = await response.json();
  const $allPostsContainer = document.querySelector('[data-allSearch]');
  $allPostsContainer.insertAdjacentHTML('afterend', insertCard(data));
  $urlForm.reset();
});
