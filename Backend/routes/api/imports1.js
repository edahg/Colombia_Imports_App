var express = require('express');
var router = express.Router();
var db=require('../../database');

/* GET imports listing. */

router.get('/get-years', function(req, res, next) {
    
    var sql='SELECT DISTINCT(YEAR(Fecha_Transaccion)) as years FROM colombia_imports';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.status(200).json(data)
    console.log(data)
    //res.render('imports-list.ejs', { title: 'Imports Colombia July 2020 - Sep 2020', importData: data});
  });
});

router.get('/get-months', function(req, res, next) {    
    var sql='SELECT DISTINCT(MONTH(Fecha_Transaccion)) as months FROM colombia_imports WHERE YEAR(Fecha_Transaccion)=2020';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.status(200).json(data)
    console.log(data)
    //res.render('imports-list.ejs', { title: 'Imports Colombia July 2020 - Sep 2020', importData: data});  
    });
});

router.get('/query-by-hscode', function(req, res, next) {
    console.log(req.query.searchInput)
    var sql= `SELECT Subpartida_Arancelaria as 'Subpartida', Proveedor_Extranjero as 'Exportador', Importador,
    NIT_Importador, ROUND(SUM(FOB),2) AS 'Total FOB', ROUND(AVG(Factor_Importacion), 2) AS 'Promedio Factor de Importacion', 
    COUNT(Num_Formulario) as 'Cant. Importaciones' 
    FROM colombia_imports 
    WHERE Subpartida_Arancelaria LIKE '%${req.query.searchInput}%'
    GROUP BY 1, 2, 3, 4
    ORDER BY 5 DESC
    LIMIT 5;`;
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.status(200).json(data)
    
    //res.render('imports-list.ejs', { title: 'Imports Colombia July 2020 - Sep 2020', importData: data});  
    });
});

router.get('/query-by-exporter', function(req, res, next) {
    
    var sql= `SELECT Proveedor_Extranjero as 'Exportador', Subpartida_Arancelaria as 'Subpartida', Importador,
    NIT_Importador, ROUND(SUM(FOB),2) AS 'Total FOB', ROUND(AVG(Factor_Importacion), 2) AS 'Promedio Factor de Importacion', 
    COUNT(Num_Formulario) as 'Cant. Importaciones' 
    FROM colombia_imports 
    WHERE Proveedor_Extranjero LIKE '%DAHUA%'
    GROUP BY 1, 2, 3, 4
    ORDER BY 5 DESC, 3, 2;`;
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data)
    //res.render('imports-list.ejs', { title: 'Imports Colombia July 2020 - Sep 2020', importData: data});  
    });
});


module.exports = router;