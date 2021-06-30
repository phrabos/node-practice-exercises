const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkID = (req, res, next, val) => {
  console.log(val);
  const id = +val;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

const checkBody = (req, res, next) => {
  const data = req.body;
  if (!data.name || !data.price) {
    return res.status(400).json({
      status: 'error',
      message: 'body must contain name and price',
    });
  }
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getSingleTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((t) => t.id === id);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const data = req.body;
  const newId = tours[tours.length - 1].id + 1;
  // eslint-disable-next-line
  const newTour = { id: newId, ...data };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = +req.params.id;
  const data = req.body;
  const tour = tours.find((t) => t.id === id);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tour: `${tour.name} has been updated with ${data.name}`,
    },
  });
};

const deleteTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((t) => t.id === id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

module.exports = {
  getAllTours,
  getSingleTour,
  updateTour,
  createTour,
  deleteTour,
  checkID,
  checkBody,
};
