const express = require('express');
const path = require('path');
const fs = require('fs');
const url = require('url');

const app = express();
const port = 3001;
app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
  });

  app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/login.html'));
  });

  app.get('/login', (req, res) => {
    var q = url.parse(req.url, true).query;
    fs.readFile('./info.json', (err, data)=>{
      if (err) throw err;
      const dataFile = JSON.parse(data.toString());
      console.log(dataFile);
      // const user = dataFile[0].username;
      // const pass = dataFile[0].password;
      console.log(q.password);
      const info = dataFile.filter(function (item){
      if (q.password === item.password && q.username === item.username) {
        return true;
      }
      else{
       return false;
      }
     });
     if (info.length > 0){
      //res.sendFile(__dirname + '/static/success.html');
      res.send(`WELCOME USER 
      ${q.username}`);
     }
     else{
      //res.sendFile(__dirname + '/static/failure.html');  
      res.send(`ENTER THE CORRECT CREDENTIALS`);
     }
    });
   });


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })