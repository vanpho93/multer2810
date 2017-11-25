const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const uid = require('uid');
const reload = require('reload');
const multer = require('multer');
const fs = require('fs');
const upload = require('./uploadConfig');

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

const saveFile = upload.single('image');

app.post('/singer', (req, res) => {
    saveFile(req, res, err => {
        if (err) {
            return res.send('Bi loi roi: ' + err.message);
        }
        const { name } = req.body;
        const image = req.file.filename;
        singers.push({ id: uid(), name, image });
        res.redirect('/singer');
    });
});

const saveFiles = upload.array('image');

app.post('/singers', saveFiles, (req, res) => {
    const filenames = req.files.map(file => file.filename);
    res.send(filenames);
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
