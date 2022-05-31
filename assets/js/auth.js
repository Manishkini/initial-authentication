const signIn = (form) => {
  fetch('/auth/createSession', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: form.elements['email'].value,
      password: form.elements['password'].value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        window.location.replace('/');
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
};
