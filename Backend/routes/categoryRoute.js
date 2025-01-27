    const express = require('express');
    const router = express.Router();
    const { createCategory, getAllCategories, findCategoryById,  } = require('../controllers/Categorycontroller');

    // Create a category    
    router.post('/category', createCategory);

    // Get all categories
    router.get('/categories',getAllCategories);

    //get a single category by ID
    router.get('/categories/:id', findCategoryById);

    

    module.exports = router;