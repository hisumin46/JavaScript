// 라이브러리 인클루드
const express = require('express');
// 애플리케이션 생성
const app = express();
const path = require('path');
// 포트 지정
const port = 3001;

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

const indexRouter = require('./index_router');
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



