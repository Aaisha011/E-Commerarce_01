const multer = require('multer');
const path = require('path');

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'Images'), // Store images in 'Images' directory
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)) // Add timestamp to avoid filename collisions
});

// Configure multer for image uploads
const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|webp|jpg|png|gif|avif/;

    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimeType && extname) return cb(null, true);
    cb('Invalid file format. Only JPEG, PNG, and GIF allowed.');
  }
});

module.exports = upload.single('image'); // Use 'image' as the field name
