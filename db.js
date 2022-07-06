module.exports = class DB {
  info = {
    host:'114.71.137.154',
    port:'52208',
    user:'diy',
    password:'server402!',
    database:'diy'
  };

  getName(conn, res, body) {
    console.log("ㄴㄴㄴㄴㄴㄴㄴ다다ㅏ바바ㅏ",body);
    // const id = body.id;
    const id = 1;
    const qry = 'select SN_NAME from TB_TEST where SN_ID = ?';

    conn.query(qry, [id], (err, row) => {
      console.log(row);
      res.send(row);
      res.end();
    })
  };
}