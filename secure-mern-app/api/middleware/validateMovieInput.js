const allowedGenres = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Sci-Fi',
  'Romance'
];

const validateMovieInput = (req, res, next) => {

  // Make sure a request body exists
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({
      error: 'Request body is required'
    });
  }

  const { title, genre, year, description } = req.body;

  // Check required fields
  if (
    title === undefined ||
    genre === undefined ||
    year === undefined ||
    description === undefined
  ) {
    return res.status(400).json({
      error: 'All fields are required'
    });
  }

  // Check data types
  if (
    typeof title !== 'string' ||
    typeof genre !== 'string' ||
    typeof year !== 'number' ||
    typeof description !== 'string'
  ) {
    return res.status(400).json({
      error:
        'Title, genre and description must be text values, and year must be a number'
    });
  }

  // Trim text values
  const trimmedTitle = title.trim();
  const trimmedGenre = genre.trim();
  const trimmedDescription = description.trim();

  // Validate title
  if (
    trimmedTitle.length < 2 ||
    trimmedTitle.length > 100
  ) {
    return res.status(400).json({
      error: 'Title must be between 2 and 100 characters'
    });
  }

  // Validate genre
  if (!allowedGenres.includes(trimmedGenre)) {
    return res.status(400).json({
      error:
        'Genre must be Action, Comedy, Drama, Horror, Sci-Fi, or Romance'
    });
  }

  // Validate year
  if (
    year < 1888 ||
    year > new Date().getFullYear()
  ) {
    return res.status(400).json({
      error: 'Year must be a valid movie release year'
    });
  }

  // Validate description
  if (
    trimmedDescription.length < 5 ||
    trimmedDescription.length > 250
  ) {
    return res.status(400).json({
      error: 'Description must be between 5 and 250 characters'
    });
  }

  // Replace request body with cleaned data
  req.body = {
    title: trimmedTitle,
    genre: trimmedGenre,
    year: year,
    description: trimmedDescription
  };

  next();
};

module.exports = validateMovieInput;