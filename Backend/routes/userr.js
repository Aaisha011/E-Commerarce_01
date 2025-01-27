const express = require('express');
const router = express.Router();

// Example delete user route
router.delete('/api/userr/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        
        // Simulate a user deletion (replace with actual logic)
        const deletedUser = await User.destroy({ where: { id: userId } }); // Assuming User is your model
        
        if (deletedUser) {
            return res.status(200).json({ message: 'User deleted successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user', error });
    }
});

// Export the routernm 
module.exports = router;
