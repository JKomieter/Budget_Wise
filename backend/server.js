const express = require('express');
const app = express();
const PORT = 8888;
const router = require('./routes/routes.js');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
