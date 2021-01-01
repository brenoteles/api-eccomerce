const cors = require('cors');
const express = require('express');
const routes = require('./routes');

require('./database'); //Importando a base de dados

global.__basedir = __dirname;

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(3333);