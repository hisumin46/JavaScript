const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mysql = require('mysql2');
// const cors = require('cors');

const dbfs = require('./db.js');
const db =new dbfs();

const conn = mysql.createPool(db.info);
conn.getConnection((err) => {
  if (!err) {
    console.log("연결 성공");
  } else {
    console.log(err);
  }
})

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

const router = require('./routes/router');
app.use('/', router);

// app.post('/get-db', (req, res) => {
//   const body = req.body;
//   console.log(body);
//   return db.getName(conn, res, body);
// })

app.use(express.urlencoded({
  limit: '10mb',
  extended: true
}));

app.post('/get-db', (req, res) => {
  console.log("server- req",req);
  const body = req.body;
  console.log("server- body",body);
  return db.getName(conn, res, body);
})