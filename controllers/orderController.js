const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');

/**
 * Get all orders
 * @route GET /api/orders
 */
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId');
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get order by ID
 * @route GET /api/orders/:id
 */
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customerId');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const details = await OrderDetail.find({ orderId: req.params.id }).populate('itemId');
    res.json({ order, details });
  } catch (err) {
    console.error('Error getting order:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Create new order
 * @route POST /api/orders
 */
exports.createOrder = async (req, res) => {
  try {
    const { customerId, items } = req.body;

    if (!customerId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Customer and items are required' });
    }

    const order = new Order({ customerId });
    await order.save();

    const orderDetails = items.map(item => ({
      orderId: order._id,
      itemId: item.itemId,
      quantity: item.quantity,
      price: item.price
    }));

    await OrderDetail.insertMany(orderDetails);
    res.status(201).json({ message: 'Order created', orderId: order._id });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete order and its details
 * @route DELETE /api/orders/:id
 */
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    await OrderDetail.deleteMany({ orderId: req.params.id });
    res.json({ message: 'Order and its details deleted' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ message: 'Server error' });
  }
};