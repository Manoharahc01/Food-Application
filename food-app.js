const router = require('./router/router');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 8080;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/food', router);




app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
});