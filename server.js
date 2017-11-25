const express = require('express');

const app = express();

// Mot cai handler function trung gian
// 1. Dap tra luon cai request
// 2. Them thuoc tinh vao req hoac res roi cho di qua
// 3. console.log


// La 1 function (req, res, next) => 
const myMiddleware = (req, res, next) => {
    req.user = { name: 'abcd' };
    console.log('Co nguoi truy cap luc: ' + new Date());
    // return res.send('aaaaa');
    next();
};

app.use(myMiddleware);


app.get('/', (req, res) => {
    res.send('Hello ' + req.user.name);
    // next();
});

app.get('/', (req, res) => {
    res.send('Hello 2' + req.user.name);
});

app.get('/:name', (req, res) => {
    res.send('Hello ' + req.params.name);
})

app.get('/a', (req, res) => {
    res.send('a');
});

app.get('/b', (req, res) => {
    res.send('b');
});

app.use((err, req, res, next) => {
// handle error
});

app.listen(3000, () => console.log('Server started!'));
