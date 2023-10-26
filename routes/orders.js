const express = require('express');
const ordersRouter = express.Router();
const Order = require('../models/order');
const Canteen = require('../models/canteen');
const User = require('../models/user');

// Route for placing an order by a customer to a canteen
ordersRouter.post('/api/place-order', async (req, res) => {
    try {
        const { customerId, canteenId, canteenName, items } = req.body;

        // Calculate the total amount of the order
        let total = 0;
        items.forEach((item) => {
            total += item.amount * item.quantity;
        });

        // TODO: Add payment gateway integration
        const payment = {
            method: 'Google Pay',
            transactionId: '1234567890',
            amount: 200,
            status: 'Pending',
            created_at: Date.now()
        };

        // Create a new order
        const order = new Order({
            customerId,
            canteenId,
            canteenName,
            items,
            total,
            payment: payment
        });

        await order.save();

        // Add the order to the customer's order history
        try {
            // Get the customer
            const customer = await User.findById(customerId);

            // Add the order to the customer's order history
            customer.order_history.push(order);
            await customer.save().then(() => console.log('Order added to customer'));

        } catch (error) {
            console.log(error.message);
        }

        // Add the order to the canteen's order history
        try {
            // Get the canteen
            const canteen = await Canteen.findById(canteenId);

            // Add the order to the canteen's order history
            canteen.orders.push(order);
            await canteen.save();

        } catch (error) {
            console.log(error.message);
        }
        

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: order
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route for getting order history of a customer
ordersRouter.get('/api/get-order-history-customer/:customer_id', async (req, res) => {
    try {
        // const orders = await Order.find({ customerId: req.params.customer_id });
        const order_history_ids = (await User.findById(req.params.customer_id)).order_history;
        const orders = await Order.find({ _id: { $in: order_history_ids } });
        res.json({
            success: true,
            message: 'Listed order history for the customer',
            data: orders
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

ordersRouter.get('/api/get-order-history/:customer_id', async (req, res) => {
    try {
        const user = await User.findById(req.params.customer_id).populate({path: 'order_history'});

        res.json({
            success: true,
            message: 'Listed order history for the customer',
            data: user.order_history
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Route for getting all orders placed to a canteen
ordersRouter.get('/api/get-order-history-canteen/:canteen_id', async (req, res) => {
    try {
        // const orders = await Order.find({ canteenId: req.params.canteen_id });
        const order_history_ids = (await Canteen.findById(req.params.canteen_id)).orders;
        const orders = await Order.find({ _id: { $in: order_history_ids } });
        res.json({
            success: true,
            message: 'Listed order history for the canteen',
            data: orders
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Route for getting all orders requests to a canteen
ordersRouter.get('/api/get-order-requests/:canteen_id', async (req, res) => {
    try {
        const orders = await Order.find({ canteenId: req.params.canteen_id});
        const updatedOrders = orders.filter(order => order.status === 'Pending');
        res.json({
            success: true,
            message: 'Listed all order requests',
            data: updatedOrders
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Route for updating the status of an order
ordersRouter.patch('/api/update-order/:order_id', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.order_id);
        if (status && order.status !== status) {
            order.status = status;
        }
        await order.save();
        res.json({
            success: true,
            message: 'Order status updated successfully',
            data: order
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = ordersRouter;
