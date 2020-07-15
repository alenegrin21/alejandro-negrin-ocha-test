const express = require('express');
const app = express();


app.use(express.static('./dist/alejandro-negrin-ocha-test'));

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/alejandro-negrin-ocha-test/' }
    );
});

app.listen(process.env.PORT || 8080);