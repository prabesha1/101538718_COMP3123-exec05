const fs = require('fs');
const path = require('path');
const express = require('express');
const routerUser = express.Router();

routerUser.get('/profile', (req, res, next) => {
  try {
    const p = path.join(__dirname, '..', 'data', 'user.json');
    const raw = fs.readFileSync(p, 'utf-8');
    const user = JSON.parse(raw);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

routerUser.post('/login', (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    const p = path.join(__dirname, '..', 'data', 'user.json');
    const raw = fs.readFileSync(p, 'utf-8');
    const user = JSON.parse(raw);

    if (username !== user.username) {
      return res.json({ status: false, message: 'User Name is invalid' });
    }
    if (password !== user.password) {
      return res.json({ status: false, message: 'Password is invalid' });
    }
    res.json({ status: true, message: 'User Is valid' });
  } catch (e) {
    next(e);
  }
});

routerUser.get('/login', (req, res, next) => {
    res.status(200).json({ message: 'GET /login endpoint is working.' });
});

routerUser.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logged out.</b>`);
});

module.exports = routerUser;
