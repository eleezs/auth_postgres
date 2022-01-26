const express = require('express');
const models = require('../models')
const router = express.Router();

router.post('/api/signup', (req, res) => {
  models.user.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
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