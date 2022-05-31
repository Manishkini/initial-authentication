module.exports.home = (req, res) => {
  res.render('home', {
    title: 'Authentication | Home page',
    layout: 'layout',
  });
};

module.exports.resetPassword = (req, res) => {
  res.render('reset-password', {
    title: 'Authentication | Reset Password Page',
    layout: 'layout',
  });
};
