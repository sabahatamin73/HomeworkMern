const {MongoClient, ObjectId} = require('mongodb');
const uri = 'mongodb+srv://sabahat:3453@cluster0.sltaf.mongodb.net/User?retryWrites=true&w=majority';
// eslint-disable-next-line max-len
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(express.urlencoded());
app.use(express.static('public'));
app.set('view engine', 'ejs');


// ======================= index page (read) ==================================
app.get('/', (req, res) => {
  client.connect(async (err) => {
    if (err) {
      throw err;
    }
    const usercollection = client.db('Users').collection('User');
    const userCursor = usercollection.find({});
    await userCursor.toArray((err, userData) => {
      res.render('./index.ejs', {userData});
    });
    client.close();
  });
});

// =========================== create =========================================
app.post('/add', (req, res) =>{
  client.connect(async (err) => {
    if (err) {
      throw err;
    }
    const usercollection = client.db('Users').collection('User');
    usercollection.insertOne(req.body, (err, result) => {
      res.render('');
    });
    client.close();
  });
});

// ============================== delete ======================================
app.get('/delete/:userId', (req, res) =>{
  client.connect(async (err) => {
    if (err) {
      throw err;
    }
    const usercollection = client.db('Users').collection('User');
    const {ObjectId} = require('mongodb');
    // eslint-disable-next-line max-len
    await usercollection.deleteOne({'_id': new ObjectId(req.params.userId)}, (err, result) => {
      res.redirect('/');
    });
    client.close();
  });
});

// ============================== update ======================================
app.post('/edit', (req, res) =>{
  client.connect(async (err) => {
    if (err) {
      throw err;
    }
    const usersCollection = client.db('Users').collection('User');
    await usersCollection.updateOne({'_id': new ObjectId(req.body._id)}, {$set: {'name':req.body.name, 'email':req.body.email, 'address':req.body.address, 'phone':req.body.phone}}, (err, result) => {
      res.redirect('/');
    });
    client.close();
  });
});

app.listen(port);
