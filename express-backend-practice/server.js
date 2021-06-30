const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((t) => t.id === id);
  tour
    ? res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      })
    : res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
});

app.post('/api/v1/tours', (req, res) => {
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
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = +req.params.id;
  const data = req.body;
  const tour = tours.find((t) => t.id === id);
  tour
    ? res.status(200).json({
        status: 'success',
        data: {
          tour: `${tour} has been updated with ${data}`,
        },
      })
    : res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server spinning on port ${PORT}`);
});
