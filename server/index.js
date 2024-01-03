const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());

//Middleware
const upload = require('./middleware/upload');
const auth = require('./middleware/auth');

//App config
const config = require('./config');

const describeImage = require(`./providers/${config.provider}`);

app.get('/', (req, res) => {
    res.send("I'm ready");
});

app.post('/upload', upload.single('file'), auth, async (req, res) => {

    if (!req.body.lang) {
        res.json({error: "language code is missing"});
        fs.unlinkSync(req.file.path);
        return;
    }

    try {
        const response = await describeImage(req.file.path, req.body.lang);
        if (!response) throw new Error ('Unsupported language');
        res.json({text: response});
    } catch (error) {
        res.json({error: 'Unsupported language or vision provider error'});
    }
    fs.unlinkSync(req.file.path);
});

app.listen(config.port, () => {
    `IRIS is listening on port ${config.port}`
})