const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:sjo@localhost:5432/postgres');
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log('app listening on', port));

sequelize.authenticate().then(() => console.log('Connection to db is good')).catch(err => console.log('we suck', err));

const Model = Sequelize.Model;
class User extends Model {}
User.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'user'});

User.sync({ force: true }).then(() => {
  return User.create({ firstName: 'Andrew', lastName: 'LEE', email: 'dave lee' });
});

app.post('/users', (req,res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });

  res.send('User successfully created!');
})
