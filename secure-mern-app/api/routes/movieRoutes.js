const express = require('express');

const router = express.Router();

const {
  getAllMovies,
  getMovieById,
  createMovie
} = require('../controllers/movieController');

const validateMovieInput = require('../middleware/validateMovieInput');

// GET all movies
router.get('/', getAllMovies);

// GET movie by ID
router.get('/:id', getMovieById);

// POST a new movie
router.post(
  '/',
  validateMovieInput,
  createMovie
);

module.exports = router;