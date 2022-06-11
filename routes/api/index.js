const router = require('express').Router();
const commentRoutes = require('./user-routes');
const pizzaRoutes = require('./thoughts-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;