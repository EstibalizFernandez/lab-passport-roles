const constants = require('../constants');
const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/list', (req, res, next) => {
  res.render('list');
});

module.exports = router;

const usersController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/role.middleware');

router.get('/list', authMiddleware, usersController.list);
router.get('/', usersController.create);
router.post('/', usersController.doCreate);
router.post('/:id/delete', 
  authMiddleware.isAuthenticated, 
  authMiddleware.checkRole(constants.ROLE_ADMIN), 
  usersController.doDelete);


