const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const uid = require('uid');
const reload = require('reload');
const multer = require('multer');

const upload = multer({ dest: './public' });
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.redirect('/singer'));

const singers = [
    { id: uid(), name: 'Bao Anh', image: '1.jpg' },
    { id: uid(), name: 'Soobin', image: '2.jpg' },
];

app.get('/singer', (req, res) => {
    res.render('singer', { singers });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/singer', parser, (req, res) => {
   const { name, image } = req.body;
   singers.push({ id: uid(), name, image });
   res.redirect('/singer');
});

app.get('/demoupload', (req, res) => {
    res.render('demoupload');
});

app.post('/demoupload', upload.single('singerImage'), (req, res) => {
    // res.render('demoupload');
    res.send('Thanh cong');
});

app.listen(3000, () => console.log('Server started'));

reload(app);
