const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');

/**
 * Get all customers
 */
exports.getAllCustomers = async (req, res) => {
  const customers = await Customer.find().select('-password');
  res.json(customers);
};

/**
 * Get a single customer by ID
 */
exports.getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.id).select('-password');
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  res.json(customer);
};

/**
 * Update a customer's info
 */
exports.updateCustomer = async (req, res) => {
  const { name, email } = req.body;
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name, email },
    { new: true }
  ).select('-password');
  res.json(customer);
};

/**
 * Delete a customer
 */
exports.deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Customer deleted' });
};

/**
 * Register a new customer
 */
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const existing = await Customer.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = new Customer({ name, email, password: hashedPassword });
    await customer.save();

    res.status(201).json({
      message: 'Customer registered successfully',
      customer: {
        _id: customer._id,
        name: customer.name,
        email: customer.email
      }
    });
  } catch (error) {
    console.error('Error registering customer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
