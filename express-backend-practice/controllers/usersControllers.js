const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
};

const getSingleUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => el.id === id);
  user
    ? res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          user,
        },
      })
    : res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
};

const createUser = (req, res) => {
  const data = req.body;
  const newId = users[users.length - 1].id + 'zz';
  // eslint-disable-next-line
  const newUser = { id: newId, ...data };
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          user: newUser,
        },
      });
    }
  );
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const user = users.find((el) => el.id === id);
  user
    ? res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          user: `${user.name} has been updated with ${data.name}`,
        },
      })
    : res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => el.id === id);
  user
    ? res.status(204).json({
        status: 'success',
        data: null,
      })
    : res.status(404).json({
        status: 'fail',
        requestedAt: req.requestTime,
        message: 'Invalid ID',
      });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  createUser,
  deleteUser,
};
