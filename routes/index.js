var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var db      = require('mssql');

/* GET home page. */
router.get('/', function(req, res, next) {


  var connection = db.createConnection({
    host     : 'redemodb.cgp09gsdippi.eu-central-1.rds.amazonaws.com',
    user     : 'siemens',
    password : '957585',
    database : 'events'
  });

  connection.connect();

  connection.query('SELECT * from comments', function(err, rows, fields) {
    if (!err){
      console.log('The solution is: ', rows);
      console.log('The fields are: ', fields);
      res.render('index', { title: 'SQL Query', result: rows , fields: fields });
    }
    else
      console.log('Error while performing Query.');
  });
  connection.end()
});

module.exports = router;
