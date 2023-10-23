const express = require('express');
const Canteen = require('../models/canteen');
// const Institute = require('../models/institute');

const canteenRouter = express.Router();

// CREATE CANTEEN
canteenRouter.post('/api/create-canteen', async (req, res) => {
    try {
        const { name, manager, menu, contact, is_active } = req.body;
        const existingCanteen = await Canteen.findOne({ name });

        console.log(name, manager, menu, contact, is_active);
        if (existingCanteen) {
            return res.status(400).json({ error: 'Canteen with the same name already exists' });
        }
        const canteen = new Canteen({ name, manager, menu, contact, is_active });
        await canteen.save();
        res.status(201).json({
            success: true,
            message: `Welcome to Sizzlr, ${name}!`,
            data: canteen
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET ALL CANTEENS
canteenRouter.get('/api/get-canteens', async (req, res) => {
    try {
        const canteens = await Canteen.find({});
        res.json({
            success: true,
            message: 'Listed all canteens',
            data: canteens
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// GET CANTEEN BY ID
canteenRouter.get('/api/get-canteen/:canteen_id', async (req, res) => {
    try {
        const canteen = await Canteen.findById(req.params.canteen_id);
        res.json({
            success: true,
            message: 'Canteen details fetched successfully',
            data: canteen
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// UPDATE CANTEEN BY ID
canteenRouter.patch('/api/update-canteen/:canteen_id', async (req, res) => {
    try {
        const { name, manager, contact, is_active } = req.body;
        const canteen = await Canteen.findById(req.params.canteen_id);
        if (name && canteen.name !== name) {
            canteen.name = name;
        }
        if (manager && canteen.manager !== manager) {
            canteen.manager = manager;
        }
        if (contact && canteen.contact !== contact) {
            canteen.contact = contact;
        }
        if (is_active !== undefined && canteen.is_active !== is_active) {
            canteen.is_active = is_active;
        }
        if (canteen.isModified()) {
            await canteen.save();
        }
        res.json({
            success: true,
            message: 'Updated canteen details successfully',
            data: canteen
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// ADD MENU ITEM TO CANTEEN BY
canteenRouter.patch('/api/add-menu-item/:canteen_id', async (req, res) => {
    try {
        const { menu } = req.body;
        const canteen = await Canteen.findById(req.params.canteen_id);

        const existingMenuItem = canteen.menu.find((item) => {
            return item.name === menu.name;
        });
        if (existingMenuItem) {
            return res.status(400).json({
                success: false,
                message: 'Menu item with the same name already exists'
            });
        }

        canteen.menu.push(menu);
        await canteen.save();
        res.json({
            success: true,
            message: 'Added item to menu successfully',
            data: canteen
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// REMOVE MENU ITEM FROM CANTEEN BY ID
canteenRouter.patch('/api/remove-menu-item/:canteen_id', async (req, res) => {
    try {
        const { item_id } = req.body;
        const canteen = await Canteen.findById(req.params.canteen_id);
        canteen.menu = canteen.menu.filter((item) => {
            return item._id.toString() !== item_id;
        });
        const updatedCanteen = await canteen.save();
        res.json({
            success: true,
            message: 'Removed item from menu successfully',
            data: updatedCanteen
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// UPDATE MENU ITEM IN CANTEEN BY ID
canteenRouter.patch('/api/update-menu-item/:canteen_id', async (req, res) => {
    try {
        const { item_id, name, price, image_url, category, availability, serving_quantity, estimated_time, veg } = req.body;
        const canteen = await Canteen.findById(req.params.canteen_id);
        const menuItem = canteen.menu.find((item) => {
            return item._id.toString() === item_id;
        });
        if (name && menuItem.name !== name) {
            menuItem.name = name;
        }
        if (price && menuItem.price !== price) {
            menuItem.price = price;
        }
        if (image_url && menuItem.image_url !== image_url) {
            menuItem.image_url = image_url;
        }
        if (category && menuItem.category !== category) {
            menuItem.category = category;
        }
        if (availability && menuItem.availability !== availability) {
            menuItem.availability = availability;
        }
        if (serving_quantity && menuItem.serving_quantity !== serving_quantity) {
            menuItem.serving_quantity = serving_quantity;
        }
        if (estimated_time && menuItem.estimated_time !== estimated_time) {
            menuItem.estimated_time = estimated_time;
        }
        if (veg !== undefined && menuItem.veg !== veg) {
            menuItem.veg = veg;
        }

        // Check if any changes were made to the canteen document
        if (canteen.isModified()) {
            await canteen.save();
        }
        res.json({
            success: true,
            message: 'Updated item in the menu successfully',
            data: canteen
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = canteenRouter;
