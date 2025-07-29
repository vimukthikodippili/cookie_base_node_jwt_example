
const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', controller.createCustomer);
router.get('/', verifyToken, controller.getAllCustomers);
router.get('/:id', verifyToken, controller.getCustomerById);
router.put('/:id', verifyToken, controller.updateCustomer);
router.delete('/:id', verifyToken, controller.deleteCustomer);

module.exports = router;
