
const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemController');
const verifyToken = require('../middleware/verifyToken');

router.get('/',verifyToken, controller.getAllItems);
router.get('/:id',verifyToken, controller.getItemById);
router.post('/', verifyToken, controller.createItem);
router.put('/:id', verifyToken, controller.updateItem);
router.delete('/:id', verifyToken, controller.deleteItem);

module.exports = router;
