const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
const app = express();
const PORT = 3000;

// app.use(express.json());
// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/');

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

