var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongodb = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {

  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/test2';
// Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);
      // Get the documents collection
      var collection = db.collection('users');
      //Create some users
      var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
      var user2 = {name: 'modulus user', age: 22, roles: ['user']};
      var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};

      collection.insert([user1, user2, user3], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
        }
        //Close connection
        db.close();
      });
    }
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
