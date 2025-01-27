const Category = require('../models/Category');
// 21
exports.findCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id; // Get the ID from the URL
        const category = await Category.findByPk(categoryId); // Use Sequelize's `findByPk` method to find by primary key
        
        if (!category) {
            return res.status(4040).json({ message: 'Category not found' }); // 404 if not found
        }
    
        res.status(200).json(category); // Return category data if found
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).json({ message: 'Error fetching category', error });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body; 
        console.log('Received data:', req.body);
        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Error creating category', error });
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        // const categoryId = req.params.id; // Get the ID from the URL
        const category = await Category.findAll(); // Use Sequelize's `findByPk` method to find by primary key
        
        if (!category) {
            return res.status(4040).json({ message: 'Category not found' }); // 404 if not found
        }
    
        res.status(200).json(category); // Return category data if found
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).json({ message: 'Error fetching category', error });
    }
};