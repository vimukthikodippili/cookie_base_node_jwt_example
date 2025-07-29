
const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, controller.getAllOrders);
router.get('/:id', verifyToken, controller.getOrderById);
router.post('/', verifyToken, controller.createOrder);
router.delete('/:id', verifyToken, controller.deleteOrder);

module.exports = router;
