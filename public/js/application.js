// document.registation.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const {
//     first_name: { value: first_name },
//     last_name: { value: last_name },
//     email: { value: email },
//     password: { value: password },
//     action,
//     method,
//   } = event.target;
//   let jsonResponse;

//   try {
//     const response = await fetch(action, {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         login,
//         password,
//       }),
//     });
//     jsonResponse = await response.json();
//   } catch (err) {
//     console.error(err);
//   }
//   if (jsonResponse && jsonResponse.authenticated) {
//     return alert('Успешный вход!');
//   }
//   return alert('Ошибка входа.');
  
// })
