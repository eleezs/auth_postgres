const express = require('express');
const models = require('../models');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
const router = express.Router();

router.post('/api/login', async(req, res) => {
  const email = req.body.email
  const password = req.body.password;
  // console.log(email, password);

  // Validate user input
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
 
  try{
    await models.user.findOne({ where: {'email': email}, }).then(user => {
      if(user == null) {
        return res.status(400).json({message: "Invalid Credentials"})
      };
      let validatePassword = bcrypt.compare(password, user.password)
      if(!validatePassword){
        return res.status(400).json({message:"Invalid Credentials"})
      }
      
      // create Token
    let token = jwt.sign(
      {user_id: user.id },
      process.env.TOKEN_KEY,
      {
        expiresIn: '1h'
      }
    );

    // send token to client
    res.send(token)
    // console.log(token)
    //   res.json({message: 'Login successful'})
    });
  }
  catch(err){
    res.json({message: err.message})
  }
   
})

module.exports = router;