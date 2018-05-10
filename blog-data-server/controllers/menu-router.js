var express = require('express');
var router = express.Router();

var menuController = require('./menu-controller');

router.get('/items', menuController.menuList);

module.exports = router;