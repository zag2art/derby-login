module.exports = function(req, res, next) {
  var self = this;

  var urls = this.options.urls;

  var parsedUrl = parseUrl(req);

  if (parsedUrl.base !== urls.base) return next();

  function done(err) {
    self.response(err, parsedUrl.method, req, res);
  }

  switch (parsedUrl.method) {
    // Catch /auth/:method
    case urls.changeemail: return self.routeChangeEmail(req, res, done);
    case urls.changepassword: return self.routeChangePassword(req, res, done);
    case urls.recoverpassword: return self.routeRecoverPassword(req, res, done);
    case urls.resetpassword: return self.routeResetPassword(req, res, done);
    case urls.login: return self.routeLogin(req, res, done);
    case urls.logout: return self.routeLogout(req, res, done);
    case urls.register: return self.routeResetPassword(req, res, done);
    case urls.confirmregistration: return self.routeConfirmRegistration(req, res, done);
    case urls.confirmemailchange: return self.routeConfirmEmailChange(req, res, done);
    // Catch /auth/:provider and /auth/:provider/callback routes
    default: return self.routeHandleStrategies(req, res, next, done);
  }

  function parseUrl(req){

    var parts = req.path.slice(1).split('/');

    return {
      base: parts[0],
      method: parts[1]
    }
  }

};