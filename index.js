const express = require('express');
const app = express();
const api = require('./src/app');

app.use(api);
