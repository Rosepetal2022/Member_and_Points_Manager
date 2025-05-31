const express = require('express');
const router = express.Router();

const classEntryRoutes = require('./classEntryRoutes');
const classesRoutes = require('./classesRoutes');
const divisionRoutes = require('./divisionRoutes');
const familyRoutes = require('./familyRoutes');
const horseOwner = require('./horseOwner');
const horseRoutes = require('./horseRoutes');
const memberRoutes = require('./memberRoutes');
const seasonRoutes = require('./seasonRoutes');
const showRoutes = require('./showRoutes');
const authRoutes = require("./authRoutes");

router.use('/classEntry', classEntryRoutes);
router.use('/classes', classesRoutes);
router.use('/divisions', divisionRoutes);
router.use('/family', familyRoutes);
router.use('/horseOwner', horseOwner);
router.use('/horse', horseRoutes);
router.use('/member', memberRoutes);
router.use('/seasons', seasonRoutes);
router.use('/shows', showRoutes);
router.use('/user', authRoutes);

module.exports = router;
