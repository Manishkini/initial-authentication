module.exports.sendFlash = (req, res, next) => {
  res.locals.flash = {
    error: req.flash('error'),
    success: req.flash('success'),
  };
  next();
};
