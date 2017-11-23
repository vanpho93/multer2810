const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const uid = require('uid');
const reload = require('reload');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public'),
    filename: (req, file, cb) => cb(null, uid() + file.originalname)
});

const upload = multer({ storage });

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

app.get('/remove/:id', (req, res) => {
    const { id } = req.params;
    const index = singers.findIndex(singer => singer.id === id);
    fs.unlinkSync('./public/' + singers[index].image);
    singers.splice(index, 1);
    res.redirect('/singer');
});

app.post('/singer', upload.single('image'), (req, res) => {
   const { name } = req.body;
   const image = req.file.filename;
   singers.push({ id: uid(), name, image });
   res.redirect('/singer');
});

/*
    app.get('/demoupload', (req, res) => {
        res.render('demoupload');
    });

    app.post('/demoupload', upload.single('singerImage'), (req, res) => {
        // res.render('demoupload');
        res.send('Thanh cong');
    });
*/
app.listen(3000, () => console.log('Server started'));

reload(app);
