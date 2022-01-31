const express = require('express');
const models = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('pg/lib/defaults');
const router = express.Router();

const salt = 10;

router.post('/api/signup', async(req, res) => {

  const { username, email, password } = req.body;

  //validate input
  if(!username && !email && !password) {
    res.status(400).send('All input is required');
  }
  if (password.length < 8){
    return res.send('Password must be 8 character and above')
  }
  // check is user exist
  let oldUser = await models.user.findOne({where: {'email': email} });
  if(oldUser){
    return res.status(400).send('User Already Exist. Please login instead')
  }
  
  // create user
  // hash password
  let hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    let user = await models.user.create({
      username: username.toUpperCase(),
      email: email.toLowerCase(),
      password: hashedPassword
    });
    let token = jwt.sign(
      {user_id: user.id },
      process.env.TOKEN_KEY,
      {
        expiresIn: '1h'
      }
    );
    res.header('x-auth-token', token).json({user});
  }
    catch(err) {
    res.status(500).send({
      message: err.message
    })
  }
});

module.exports = router