const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
let counter = 0;

app.use(express.urlencoded());

app.get('/', (req, res) => {
  console.log(`aaya hay ${++counter}`);
  // res.send('Hello World!');
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/html5.html'));
});

app.post('/html', (req, res) => {
  const dataFile = path.join(__dirname, 'data/users.json');
  let data = [];
  if(fs.existsSync(dataFile)){
    data = JSON.parse(fs.readFileSync(dataFile));
  }  
  data.push(req.body);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, "\t"));
  //res.sendFile(path.join(__dirname, 'views/html5.html'));
  console.log(req.body)
  res.json(data);
});

app.get('/html5', (req, res) => {
  res.redirect('/html');
});

app.get('/population', (req, res) => {
  if(!req.query.year)
  {
    res.send(`<form> <input type="text" name= "year" placeholder="Enter year">
    <button type="submit">Search</button> </form> 
    `);
  }    
  else 
  {
    const File = path.join(__dirname, 'data/population.json');
    const year = req.query.year;
 
  
    if(fs.existsSync(File))
    {
        let data = JSON.parse(fs.readFileSync(File));
        const infoData = data[1];
        const yearData = infoData.filter(function (item)  { 
            
            return item.date.includes(year);
        } );
        
        res.send(yearData);    
    } 
    else 
    {
        res.send(`You chose the year ${req.params.year}`);
    }
  } 
});

app.get('/population/:year', (req, res) => {
  res.send(`You chose the year ${req.params.year}`);
});



app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// const http = require('http');
// const fs = require('fs');
// const url = require('url');

// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'text/html');

//     let path = './views/';
//     console.log(req.url);
//     switch(req.url.split("?")[0]) {
//         case '/':
//             path +='index.html';
//             res.statusCode = 200;
//             break;
//         case '/html':
//             path +='html5.html'
//             res.statusCode = 200;
//             break;
//         case '/html5':
//             res.statusCode = 301;
//             res.setHeader('Location','/html');
//             res.end()
//             break;
//         case '/get-data':
//             var q = url.parse(req.url, true).query;
//             var txt = JSON.stringify(q, null, '\t');
//             res.setHeader('Content-Type', 'application/json');
//             res.end(txt);
//             break;
//             //
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.end(`{
//                 "api":"Test API",
//                 "class":"MERN",
//                 "result":"success"
//             }`);
//             break;
//         default:

//             path +='404.html';
//             res.statusCode = 404;
//     }

//     fs.readFile(path, (err, data) => {
//         if(err) {
//             // console.log(err);
//             res.end();
//         } else{
//             res.write(data);
//             res.end();
//         }

//     });
// //     res.write(`URL = ${req.url} 
// // Method = ${req.method}`);
// //    res.end();
// });
// //.listen(3000);

// server.listen(3000, (err) => {
//     console.log('started listening');
// });
