const express = require('express');
const updateRouter = express.Router();
const Order = require('../models/order');
const Canteen = require('../models/canteen');
const User = require('../models/user');

// Route for updating user details
updateRouter.patch('/api/update-user-details/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const { name, email, password, contact } = req.body;
        const updatedUserDetails = await User.findOneAndUpdate(
            { _id: user_id },
            { $set: { name: name, email: email, password: password, contact: contact } },
            {returnDocument: 'after', runValidators: true}
            );
        res.status(200).json({
            success: true,
            message: 'User details updated successfully',
            data: updatedUserDetails
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Route for updating canteen details
updateRouter.patch('/api/update-canteen-details/:canteen_id', async (req, res) => {
    try {
        const canteen_id = req.params.canteen_id;
        const { name, manager, contact, is_active } = req.body;
        const updatedCanteenDetails = await Canteen.findOneAndUpdate(
            { _id: canteen_id },
            { $set: { name: name, manager: manager, contact: contact, is_active: is_active } },
            {returnDocument: 'after', runValidators: true}
            );
        res.status(200).json({
            success: true,
            message: 'Canteen details updated successfully',
            data: updatedCanteenDetails
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = updateRouter;