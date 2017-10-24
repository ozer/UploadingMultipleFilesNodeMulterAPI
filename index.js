
const bodyParser = require('body-parser');
const express = require('express');
const Promise = require('bluebird');
const path = require('path');
const app = express();
var multer = require('multer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

const upload = multer({ storage : storage }).array('pictures',5);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello Başar', 200);
});

app.get('/pic', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
})

app.post('/pictures', (req, res) => {
    console.log(req.body.pictures);
    upload(req,res,function(err) {
        console.log(req.body);
        console.log(req.files);
        if(err) {
            return res.end("Error uploading file."+ err.message);
        }
        res.end("File is uploaded");
    });

})

//app.listen(5000, () => console.log("Server is working on 5000"));
Promise.resolve()
    .then(() => console.log("server initiation"))
    .catch((err) => console.log("Server initiation has error" + err))
    .finally(() => app.listen(port));