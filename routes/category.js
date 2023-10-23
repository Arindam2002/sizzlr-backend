const express = require('express');
const Category = require('../models/category');
const Canteen = require('../models/canteen');
const { default: mongoose } = require('mongoose');

const categoryRouter = express.Router();

categoryRouter.post('/api/add-category/', async (req, res) => {
    try {
        const { name } = req.body;
        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({ error: 'Category with the same name already exists' });
        }
        const category = new Category({ name });
        await category.save();
        res.status(201).json({
            success: true,
            message: `Category added successfully`,
            data: category
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: `Server error: ${err.message}`
         });
    }
});

// GET ALL CATEGORIES
categoryRouter.get('/api/get-all-categories', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json({
            success: true,
            message: 'Listed all categories',
            data: categories
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: `Server error: ${err.message}`
        });
    }
});

// GET ALL CATEGORIES OF A CANTEEN
categoryRouter.get('/api/get-categories/:canteen_id', async (req, res) => {
    try {
        const canteen_id = req.params.canteen_id;

        const categories = await Canteen.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(canteen_id) } },
            { $unwind: '$menu' },
            { $group: { _id: '$menu.category' } },
            { $project: { _id: 0, category: '$_id' } }
        ]);

        const categoryIds = categories.map(category => category.category);

        const categoryData = await Category.find({ _id: { $in: categoryIds } });

        res.json({
            success: true,
            message: 'Listed all categories of the canteen',
            data: categoryData
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: `Server error: ${err.message}`
        });
    }
});

// Filter menu by canteen and category
categoryRouter.get('/api/get-menu/:canteen_id/:category_id', async (req, res) => {
    try {
        const canteen_id = req.params.canteen_id.toString();
        const category_id = req.params.category_id.toString();
        console.log(canteen_id, category_id);
        const menu = (await Canteen.findById(canteen_id)).menu;
        const filteredMenu = menu.filter((item) => {
            return item.category == category_id;
        });
        res.json({
            success: true,
            message: 'Filtered menu',
            data: filteredMenu
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: `Server error: ${err.message}`
        });
    }
});

// GET CATEGORY BY ID
categoryRouter.get('/api/get-category/:category_id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.category_id);
        res.json({
            success: true,
            message: 'Category details fetched successfully',
            data: category
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: `Server error: ${err.message}`
        });
    }
});

// UPDATE CATEGORY BY ID (Future scope)
categoryRouter.patch('/api/update-category/:category_id', async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findById(req.params.category_id);
        if (name && category.name !== name) {
            category.name = name;
        }
        await category.save();
        res.json({
            success: true,
            message: 'Category details updated successfully',
            data: category
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: `Server error: ${err.message}`
        });
    }
});

// DELETE CATEGORY BY ID (Future scope)
categoryRouter.delete('/api/delete-category/:category_id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.category_id);
        await category.remove();
        res.json({
            success: true,
            message: 'Category deleted successfully',
            data: category
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: `Server error: ${err.message}`
        });
    }
});


module.exports = categoryRouter;