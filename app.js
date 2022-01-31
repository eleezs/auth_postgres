const express = require('express');
const bodyParser = require('body-parser');
const cors =require('cors')
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const auth = require('./middleware/auth')
require('dotenv').config();

const signUp = require('./routes/signupRoute');
const login = require('./routes/loginRoute');

const app = express();

let corsOptions = {
  origin: "http://localhost:3031"
};

app.use(cors(corsOptions));

// app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended: true }))


app.get('/', auth, (req, res) => {
 res.json({message: 'Welcome to food'})
})

// connect to db

const sequelize = new Sequelize ( 
  'firstDB', 
  'postgres', 
  process.env.DB_PWD, 
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
app.post('/api/signup', signUp);

// login
app.post('/api/login', login)




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`)
});