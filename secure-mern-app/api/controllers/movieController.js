const movies = [
  {
    id: 'm1',
    title: 'Inception',
    genre: 'Sci-Fi',
    year: 2010,
    description:
      'A thief enters peoples dreams to steal secrets.'
  },
  {
    id: 'm2',
    title: 'The Dark Knight',
    genre: 'Action',
    year: 2008,
    description:
      'Batman faces a dangerous criminal in Gotham City.'
  }
];

const getAllMovies = (req, res) => {
  res.status(200).json({
    count: movies.length,
    data: movies
  });
};

const getMovieById = (req, res) => {
  const { id } = req.params;

  if (!/^[a-zA-Z0-9-]+$/.test(id)) {
    return res.status(400).json({
      error: 'Invalid movie ID format'
    });
  }

  const movie = movies.find(
    (item) => item.id === id
  );

  if (!movie) {
    return res.status(404).json({
      error: 'Movie not found'
    });
  }

  res.status(200).json({
    data: movie
  });
};

const createMovie = (req, res) => {

  
  const {
    title,
    genre,
    year,
    description
  } = req.body;

  const newMovie = {
    id: `m${movies.length + 1}`,
    title,
    genre,
    year,
    description
  };

  movies.push(newMovie);

  res.status(201).json({
    message: 'Movie created',
    data: newMovie
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie
};