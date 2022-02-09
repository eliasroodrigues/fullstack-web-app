const express = require('express');
const bcrypt = require('bcrypt');
const { Users } = require('../models');
const router = express.Router();
const { sign } = require('jsonwebtoken');

const { validateToken } = require('../middlewares/AuthMiddleware');

router.post("/", async (req, res) => {
  const {username, password} = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("POST User");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({where: { username: username }});

  if (!user) {
    res.json({ error: "User doesn't exist" });
  };

  if (user) {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: "Wrong username and password combination." });

      const accessToken = sign({ username: user.username, id: user.id }, "importantsecret");

      res.json({ token: accessToken, username: user.username, id: user.id });
    });
  };
});

router.get('/auth', validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;