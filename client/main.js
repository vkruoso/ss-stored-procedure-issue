const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MEMSQL_HOST,
  port: process.env.MEMSQL_PORT,
  user: process.env.MEMSQL_USER,
  password: process.env.MEMSQL_PASS,
  database: process.env.MEMSQL_DATABASE,
  debug: true,
  multipleStatements: true,
});

pool.query(`
CREATE OR REPLACE PROCEDURE test_sp_4(v int)
  AS
  DECLARE
    c int = 1;
  BEGIN
    DROP TABLE IF EXISTS temp_aux;
    CREATE TEMPORARY TABLE temp_aux(
      val int
    );
    DELETE FROM temp_aux;
    INSERT INTO temp_aux VALUES (c + v);

    ECHO SELECT val from temp_aux;
  END
`, (error, data) => {
  if (error) {
    console.log(error)
    return;
  }

  console.log(data)

  pool.query(`CALL test_sp_4(?)`, 2, (error, data2) => {
    if (error) {
      console.log(error)
      pool.end();
      return;
    }

    console.log(data2);
    console.log("success")
    pool.end();
  });

});
