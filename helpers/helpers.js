const constants = require('../constants');

module.exports = (hbs) => {
  hbs.registerHelper('isAdmin', (user, options) => {
    if (user.role === constants.ROLE_BOSS) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
}