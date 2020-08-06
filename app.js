const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const db = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//const inj = `INSERT INTO products(id,title, imageUrl, description) VALUES(4,'DUMMY', 'DUMMY@URL', 'DUMMY DESCRIPTION')`

// db.query(inj,(err,results, fields ) =>{
//   if(err) throw err;
//   console.log('successfully data inserted....');
//   console.log(results);
// });

db.execute('SELECT * FROM products')
  .then(result => {
   console.log(result[0]);
  })
  .catch(err => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
