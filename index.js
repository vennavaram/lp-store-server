const express = require('express');
const cartRoutes = require('./cart-routing');
const data = require('./data-models');
var cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

// Enabling CORS
app.use(cors());

let plates = data.plates;

function logErrors(err ,req, res, next){
    console.error(err);
    res.status(404).send('Nothing to see here');
}

app.use('/data', (req, resp) => resp.send(plates));
app.use('/states', (req, resp) => resp.send(data.states));
app.use('/rates', (req, resp) => resp.send({'EUR': 1.14, 'GBP': 1.31}));
app.use('/checkout', (req, resp) => resp.send({status: 'OK'}));
app.use('/login', (req, resp) => resp.send({token: '1abcd21atsampletoken21'}));

app.use('/cart', cartRoutes);

// We serve our store UI statically
app.use('/', express.static('./lp-store-ui'));

// Middleware for error handling
app.use(logErrors);

app.listen(port, (err) => {
    console.log(`License Plate server listening on ${port}`)
});
