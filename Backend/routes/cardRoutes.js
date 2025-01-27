const express = require('express');
const router = express.Router();
const { createCard, getAllCards, getCardById, updateCard, deleteCard, getCardsByCategoryId, getCardsByCategoryIdd } = require('../controllers/cardcontroller'); // Destructuring the cardController
const upload = require('../middleware/multer');
// const { findCategoryById} = require('../controllers/Categorycontroller');

// Create a card
router.post('/card',upload , createCard); // Make sure you're using multer's .single() for file upload

// Get all cards
router.get('/get-cards', getAllCards);

// Get a single card by ID
router.get('/cards/:id', getCardById);  // Fixed by using destructured getCardById

// Update a card
router.put('/cards/:id',upload, updateCard); // Using .single('image') for file upload

// Get cards by category ID
router.get('/cards/category/:id', getCardsByCategoryId);
// Delete a card

router.delete('/cards/:id',deleteCard);






module.exports = router;
