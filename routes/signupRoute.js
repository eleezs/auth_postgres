const express = require('express');
const models = require('../models')
const bcrypt = require('bcrypt');
const router = express.Router();

const salt = 10;

router.post('/api/signup', async(req, res) => {

  let hashedPassword = await bcrypt.hash(req.body.password, salt);
  await models.user.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  }).then((user) =>{
    res.status(200).send({
      message: 'User was Registered successfully'
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
});

module.exports = router