const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalsRoutes')

router.use(animalRoutes);
router.use(require('./zookeeperRoutes'));

module.exports = router;

