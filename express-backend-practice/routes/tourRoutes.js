const { Router } = require('express');
const {
  getAllTours,
  getSingleTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} = require('../controllers/toursControllers');

// const router = express.Router();
module.exports = Router()
  .param('zz', checkID)
  .get('/', getAllTours)
  .post('/', checkBody, createTour)
  .get('/:zz', getSingleTour)
  .patch('/:id', updateTour)
  .delete('/:id', deleteTour);
