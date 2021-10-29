//CONNECTIONS
const user = require('./models/user.js');
const mongoose = require('mongoose');
const uri = 'mongodb+srv://sabahat:3453@cluster0.sltaf.mongodb.net/User?retryWrites=true&w=majority';  

const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.static('public'));
app.set('view engine', 'ejs');

(async () => {
  await mongoose.connect(uri);
})();

//READ
app.get('/', async (req, res) => {
    const Data = await user.find();
    res.render('./index.ejs', {Data});
});


//ADD
app.post('/add', async (req, res) => {
    await user.create(req.body, (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
});

//UPDATE
app.post('/edit', (req, res) =>{
  user.findByIdAndUpdate(req.body._id, {$set: {'name':req.body.name, 'email':req.body.email, 'address':req.body.address, 'phone':req.body.phone}}, (err, result) => {
  if (err) throw err;
  res.redirect('/');
  });
});

//DELETE
app.get('/delete/:userId', async (req, res) => {
  await user.findByIdAndDelete(req.params.userId);
  res.redirect('/');
});

app.listen(port);
