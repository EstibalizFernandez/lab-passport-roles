const hbs = require('hbs');
const path = require('path');

require('../helpers/helpers')(hbs);

hbs.registerHelper(path.join(__dirname, '../views'));
