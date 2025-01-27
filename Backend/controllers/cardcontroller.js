const Card = require("../models/Card");
const Rating = require("../models/Rating");
const category = require('../models/Category')

// Create a new card
exports.createCard = async (req, res) => {
  try {
    const { title, description, price, categoryID } = req.body; // Ensure categoryID is extracted from req.body

    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const newCard = await Card.create({
      title,
      description,
      price,
      categoryID,
      image: req.file.filename,
    });

    res.status(201).json(newCard);
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all cards
exports.getAllCards = async (req, res) => {
  console.log(req.query.categoryID);
  try {
    const { categoryID } = req.query;
    const filter = categoryID ? { where: { categoryID } } : {};

    const cards = await Card.findAll(filter); // Find all cards with filter
    res.status(200).json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ message: "Error fetching cards" });
  }
};

// Get a single card by ID
exports.getCardById = async (req, res) => {
  try {
    const cardId = req.params.id;
    const card = await Card.findByPk(cardId, {
      include: [
        {
          model: category,
          attributes: ["name"],
        },
      ],
    });
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(card);
  } catch (error) {
    console.error("Error fetching card:", error);
    res.status(500).json({ message: "Error fetching card details", error });
  }
};

exports.getCardsByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.id; // Get the category ID from the request parameters

    // Find all cards that belong to the specified category ID
    const cards = await Card.findAll({
      where: { categoryID: categoryId }, // Adjust this field name based on your actual column name in the database
    });

    if (!cards.length) {
      return res
        .status(404)
        .json({ message: "No cards found for this category" }); // If no cards are found, return a 404 error
    }

    res.status(200).json(cards); // If found, return the cards data with a 200 status
  } catch (error) {
    console.error("Error fetching cards by category ID:", error); // Log any errors
    res.status(500).json({ message: "Error fetching cards", error }); // Return a 500 error if something goes wrong
  }
};

// Update an existing card
exports.updateCard = async (req, res) => {
  try {
    const cardId = req.params.id;
    const { title, description, price, categoryID } = req.body;
    console.log(
      title,
      description,
      price,
      categoryID,
      "..............................................."
    );

    const card = await Card.findByPk(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Set updated image URL
    const updatedImage = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : card.image;

    // Update the card details
    await card.update({
      title,
      description,
      price,
      categoryID,
      image: updatedImage,
    });

    res.status(200).json({ message: "Card updated successfully", card });
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ message: "Error updating card", error });
  }
};

// Delete a card
// cardController.js

exports.deleteCard = async (req, res) => {
  const cardId = req.params.id;
  console.log(cardId);

  try {
    const card = await Card.findByPk(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    await card.destroy();
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting card", error });
  }
};

// Get cards by category ID
exports.getCardsByCategoryIdd = async (req, res) => {
  try {
    const { id } = req.params; // Get the category ID from the route parameters

    // Check if the category exists
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not foun data" });
    }

    // Fetch cards that belong to this category ID
    const cards = await Card.findAll({
      where: { categoryID: id },
      include: [{ model: Category, attributes: ["name"] }], // Include category details
    });

    if (!cards.length) {
      return res
        .status(404)
        .json({ message: "No products found for this category" });
    }

    res.status(200).json(cards); // Return the list of cards if found
  } catch (error) {
    console.error("Error fetching cards by category ID:", error);
    res.status(500).json({ message: "Error fetching products", error });
  }
};
