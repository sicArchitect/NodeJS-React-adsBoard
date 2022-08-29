const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const fs = require('fs');
const getImageFileType = require('../utils/getImageFileType');

exports.getLoggedUser = async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findOne(req.user);
      if (!ad) res.status(404).json({ message: 'Not found...' });
      else res.json(user);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.register = async (req, res) => {
  try {
    const { login, password } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string' &&
      req.file &&
      ['/image/png', '/image/jpg', '/image/jpeg', '/image/git'].includes(
        fileType
      )
    ) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        if (req.file) {
          fs.unlinkSync(`./public/uploads//${req.file.filename}`);
        }
        return res
          .status(409)
          .json({ message: 'User with this login already exists' });
      }

      const user = new User({
        login,
        password: await bcrypt.hash(password, 10),
        avatar: req.file.filename,
      });
      await user.save();
      res.status(201).json({ message: 'User created ' + user.login });
    } else {
      if (req.file) {
        fs.unlinkSync(`./public/uploads//${req.file.filename}`);
      }
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string'
    ) {
      const user = await User.findOne({ login });

      if (!user) {
        res.status(400).json({ message: 'Login or password are incorrect!' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: 'Login successful!' });
        } else {
          req.session.login = user.login;
          res.status(400).json({ message: 'Login or password are incorrect!' });
        }
      }
    } else {
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getUser = async (req, res) => {
  res.json({ message: 'You logged!' });
};
