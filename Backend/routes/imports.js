var express = require('express');
var router = express.Router();
var db=require('../database');

/* GET imports listing. */

router.get('/imports-list', function(req, res, next) {
    
    var sql='SELECT * FROM colombia_imports where Importador LIKE "%SODIMAC%" limit 30';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data)
    res.render('imports-list.ejs', { title: 'Imports Colombia July 2020 - Sep 2020', importData: data});
  });
  
});

module.exports = router;
