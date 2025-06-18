const express = require('express');
const router = express.Router();
const {
  getFoods,
  addFood,
  updateFood,
  deleteFood,
} = require('../controllers/foodController');
const { body } = require('express-validator');

const foodValidationRules = [
  body('Product').notEmpty().withMessage('Product is required'),
  body('OrderDate').isISO8601().withMessage('OrderDate must be a valid date'),
  body('Category').notEmpty().withMessage('Category is required'),
];

router.get('/', getFoods);
router.post('/', foodValidationRules, addFood);
router.put('/:id', foodValidationRules, updateFood);
router.delete('/:id', deleteFood);

module.exports = router;
