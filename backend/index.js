const express = require('express');
const app = express();
const cors = require('cors');
//middlewares
app.use(express.json()); //Convertir un formato Json a Obj JavaScritp
app.use(express.urlencoded()); //Convertir un formato Form a Obj JavaScritp
app.use(cors());
//Router
app.use(require('./routes/index.route'));

app.listen(3000);
console.log('Servidor en el puerto 3000');