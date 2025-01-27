const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const cardRoutes = require("./routes/cardRoutes");
const categoryRoutes = require("./routes/categoryRoute");

// const productRoutes = require('./routes/productRoutes');

const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "Images")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);
app.use("/cards", cardRoutes);
app.use("/categories", categoryRoutes);
// app.use('/prod', productRoutes);

// Sequelize sync (without force to avoid dropping data)
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error creating database tables:", err);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.c || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
