const express = require('express');
const bodyParser = require('body-parser');
const cors =require('cors')
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const models = require('./models')

const app = express();

let corsOptions = {
  origin: "http://localhost:3031"
};

app.use(cors(corsOptions));

// app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended: true }))


app.get('/', (req, res) => {
 res.json({message: 'Welcome to food'})
})

// connect to db

const sequelize = new Sequelize ( 
  'firstDB', 
  'postgres', 
  'Uche', 
  {
    host: 'localhost',
    dialect: 'postgres'
  }
)
sequelize.authenticate().then(() =>{
  console.log('Database Connected Successfully')
}).catch((error) => {
  console.log('Database Connection Failed', error)
})


// signup
app.post('/api/signup', (req, res) => {
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



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`)
});