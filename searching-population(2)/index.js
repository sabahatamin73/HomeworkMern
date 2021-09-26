const express = require('express');
const path = require('path');
const fs = require('fs');   
const { UV_FS_O_FILEMAP } = require('constants');
const app = express();
const port = 3000;
app.get('/population/:year', (req, res) => {
  fs.readFile('./data/population.json', (err, data) =>{
    if (err) throw err;
    const fileData = JSON.parse((data.toString()));
    console.log(req.params.year);

    const result = fileData[1].filter(x => {
      return x.date == req.params.year; 
    });
    console.log(result);
    fs.writeFileSync('./data/resPopulation.json', JSON.stringify(result, null, 4));
      res.sendFile(path.join(__dirname, './data/resPopulation.json'));
  });
});

  app.get('/population', (req, res) => {
    res.sendFile(path.join(__dirname, './data/population.json'));
  });

  app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, './views/404.html'));
  });
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });