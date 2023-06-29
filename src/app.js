const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');

//routes
const akunRoutes = require('../routes/akunRoutes');
const pertemuanRoutes = require('../routes/pertemuanRoutes');
const dokterRoutes = require('../routes/dokterRoutes');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Selamat Datang di API meet-doctor');
});

app.use(akunRoutes);
app.use(pertemuanRoutes);
app.use(dokterRoutes);

app.listen(port, () => {
  console.log(`Server sedang berjalan di port ${port}`);
});

module.exports = app;
