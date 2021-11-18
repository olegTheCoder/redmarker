const $urlForm = document.forms.urlForm;

function insertCard({ id, url, result }) {
  return `<div data-allSearch class="container d-flex justify-content-center my-50">
  
    <div data-postid=${id} class='card my-3' style='width: 18rem;'>
    <div>
    Адрес сайта: ${url} <br>
    Статус: ${result}
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
