let mysql = require("mysql2");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: "customer-reports.csv",
  header: [
    { id: "id", title: "id" },
    { id: "name", title: "name" },
    { id: "rcvd_dtm", title: "rcvd_dtm" },
  ],
});

let con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "reports",
});

con.connect(function (err) {
  if (err) throw err;
  con.query("SELECT * FROM customer", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    csvWriter
      .writeRecords(result)
      .then(() => console.log("The CSV file was written successfully"));
    con.end();
  });
});
