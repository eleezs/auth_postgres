const express = require('express');
const models = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/api/login', async(req, res) => {
  const email = req.body.email
  const password = req.body.password;
  console.log(email, password);
 
  try{
    await models.user.findOne({ where: {'email': email}, }).then(user => {
      if(user == null) {
        return res.json({message: "Invalid Credentials"})
      };
      let validatePassword = bcrypt.compare(password, user.password)
      if(!validatePassword){
        return res.json({message:"Invalid Credentials"})
      }
  
      res.json({message: 'Login successful'})
    });
  }
  catch(err){
    res.json({message: err.message})
  }
   
})

module.exports = router;