/* eslint-disable new-cap */
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const http = require('http').Server(app);
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/session');
const uri = 'mongodb+srv://sabahat:3453@cluster0.sltaf.mongodb.net/User?retryWrites=true&w=majority';
const port = process.env.PORT || 3000;
const isAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  next();
};

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

mongoose.connect(uri).then((result)=>{
  console.log('connected to Mongo');
}).catch((error)=>{
  console.error('error connecting to Mongo', error);
});

const store = new MongoDBStore({
  uri: uri,
  collection: 'sessions',
});

app.use(session({
  secret: 'a very secret key',
  resave: false,
  saveUninitialized: false,
  store: store,
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  // req.session.something='abc';
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('index');
});

app.post('/login', (req, res) => {
  console.log(req.body);
  User.findOne(req.body, (err, result) => {
    if (err) throw err;
    if(result){
       res.render('dashboard');
    }
    else {
      res.render('dashboard');
    }
    req.session.isAuth = true;
  });
  
});

app.post('/register', async (req, res) => {
  const {email, password} = req.body;
  let users = await User.findOne({email});
  if (users) {
    return res.redirect('/register');
  }
  try {
   users = new User({
      email,
      password,
    });
    await users.save();
  } catch (e) {
    console.log(e);
  }
  res.redirect('/');
});

http.listen(port, () => console.log(`Example app listening on port ${port}!`));
