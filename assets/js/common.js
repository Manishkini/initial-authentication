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
  fetch('/auth/resetPassword', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
  })
    .then((res) => {
      return res.json();
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
