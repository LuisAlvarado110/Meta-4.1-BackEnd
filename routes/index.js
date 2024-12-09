const fs = require('fs');
const path = require('path');
const express = require("express");
const router = express.Router();
const routesDir = path.join(__dirname, './');
const routes = {};

fs.readdirSync(routesDir).forEach((file) => {
  if (file.endsWith('.js') && file !== 'index.js') {
    const routeName = file.replace('.js', '');
    routes[routeName] = require(path.join(routesDir, file));
    router.use(routes[routeName]);
  }
});

module.exports = router;