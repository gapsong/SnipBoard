const express = require('express');
const bodyParser = require('body-parser')

const startExpress = (callback) => {
    const app = express();
    const port = 4000;

    app.use(
        bodyParser.json({
            limit: '5 mb', //max. size
        })
    );

    app.post('/test', function (req, res) {
        callback()
        res.send(req.body.level_id)
    })

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
};

module.exports = startExpress;
