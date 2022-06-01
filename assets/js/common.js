const signOut = () => {
  fetch('/auth/endSession', {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => {
      console.log('res', res);
      localStorage.removeItem('token');
      window.location.replace('/auth/sign-in');
    })
    .catch((err) => {
      console.log('err', err);
    });
};

const resetPassword = () => {
  const form = document.getElementById('reset-form');
  fetch('/auth/resetPassword', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
    body: JSON.stringify({
      newPassword: form.elements['newPassword'].value,
      confirmPassword: form.elements['confirmPassword'].value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log('res', res);
      if (res.responseCode === 100) {
        window.location.replace('/auth/sign-in');
      } else if (res.responseCode === 101) {
        new Noty({
          theme: 'sunset',
          type: 'error',
          layout: 'bottomRight',
          text: res.message,
          timeout: 1500,
        }).show();
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
};
