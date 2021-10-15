const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(express.urlencoded());
app.use(express.static('public'));
app.set('view-engine', 'ejs');

//--------------------READ-------------------------

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, './data/todos.json'), (err, data) => {
        const todos = JSON.parse(data.toString());
        if (err) throw err;
        res.render('index.ejs', {
            todos
        });
    });
});

//----------------------DELETE------------------------

app.get('/delete/:id', (req, res) => {
    fs.readFile(path.join(__dirname, 'data/todos.json'), (err, data) => {
        if (err) throw err;
        console.log(req.params.id);
        const todoData = JSON.parse(data.toString());
        todoData.splice(todoData.findIndex((x) => x.id == req.params.id), 1);
        fs.writeFile(path.join(__dirname, 'data/todos.json'),
            JSON.stringify(todoData, null, 4), (err) => {
                if (err) throw err;
            });
    });
    res.redirect('/');
});

//-----------------------ADD---------------------------

app.post('/add', (req, res) => {
    fs.readFile(path.join(__dirname, 'data/todos.json'), (err, data) => {
        if (err) throw err;
        const todoData = JSON.parse(data.toString());
        todoData.push(req.body);
        fs.writeFile(path.join(__dirname, 'data/todos.json'),
            JSON.stringify(todoData, null, 4), (err) => {
                if (err) throw err;
            });
    });
    res.redirect('/');
});

//------------------------CHECK----------------------------

app.get('/toggleTodoChecked/:todoId', (req, res) => {
    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err;
        let todos = JSON.parse(data.toString());
        const id = todos.findIndex(x => x.id == req.params.todoId);
        todos[id].isChecked = todos[id].isChecked == "checked" ? "" : "checked";
        fs.writeFile('./data/todos.json', JSON.stringify(todos, null, 4), (err) => {
            if (err) throw err;
        });
        res.redirect('/');
    });
})

app.listen(port);