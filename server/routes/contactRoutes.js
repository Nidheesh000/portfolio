const express = require('express');
const router = express.Router();
const {
  submitMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
  getDashboardStats,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', submitMessage);

// Admin-only dashboard actions
router.get('/stats', protect, getDashboardStats); // Must be placed before /:id route
router.get('/', protect, getMessages);
router.put('/:id', protect, updateMessageStatus);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
