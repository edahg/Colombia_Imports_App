var express = require('express');
var router = express.Router();
var db=require('../../database');
const bcrypt = require('bcryptjs');

/* GET imports listing. */

router.get('/get-years', function(req, res, next) {    
    var sql='SELECT DISTINCT(YEAR(Fecha_Transaccion)) as years FROM colombia_imports';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.status(200).json(data)
    //res.render('imports-list.ejs', { title: 'Imports Colombia July 2020 - Sep 2020', importData: data});
  });
});

router.get('/get-months', function(req, res, next) {    
    var sql='SELECT DISTINCT(MONTH(Fecha_Transaccion)) as months FROM colombia_imports WHERE YEAR(Fecha_Transaccion)=2020';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.status(200).json(data)
    //res.render('imports-list.ejs', { title: 'Imports Colombia July 2020 - Sep 2020', importData: data});  
    });
});

router.get('/query-by-hscode', function(req, res, next) {
    console.log(req.query.searchInput)
    var sql= `SELECT Subpartida_Arancelaria as 'Subpartida', Proveedor_Extranjero as 'Exportador', 
    Importador, NIT_Importador, ROUND(SUM(FOB),2) AS 'Total FOB', ROUND(AVG(Factor_Importacion), 2) 
    AS 'Promedio Factor de Importacion', COUNT(Num_Formulario) as 'Cant. Importaciones' 
    FROM (SELECT * 
        FROM colombia_imports 
        WHERE YEAR(Fecha_Transaccion) BETWEEN ${req.query.syear} AND ${req.query.fyear}
        AND MONTH(Fecha_Transaccion) BETWEEN ${req.query.smonth} AND ${req.query.fmonth}
        AND Subpartida_Arancelaria LIKE '${req.query.searchInput}%') as imports_filtered
    GROUP BY 1, 2, 3, 4
    ORDER BY 5 DESC;`;
    db.query(sql, function (err, data, fields) {
    if (err) next(err);
    res.status(200).json(data)
    
    //res.render('imports-list.ejs', { title: 'Imports Colombia July 2020 - Sep 2020', importData: data});  
    });
});

router.get('/query-by-exporter', function(req, res, next) {
    
    var sql= `SELECT Proveedor_Extranjero as 'Exportador', Subpartida_Arancelaria as 'Subpartida',
     Importador, NIT_Importador, ROUND(SUM(FOB), 0) AS 'Total FOB', 
     ROUND(AVG(Factor_Importacion), 2) AS 'Promedio Factor de Importacion', 
     COUNT(Num_Formulario) as 'Cant. Importaciones'
    FROM (SELECT * 
        FROM colombia_imports 
        WHERE YEAR(Fecha_Transaccion) BETWEEN ${req.query.syear} AND ${req.query.fyear}
        AND MONTH(Fecha_Transaccion) BETWEEN ${req.query.smonth} AND ${req.query.fmonth}
        AND Proveedor_Extranjero LIKE '%${req.query.searchInput}%') as imports_filtered
    GROUP BY 1, 2, 3, 4
    ORDER BY 5 DESC, 3, 2;`;
    db.query(sql, function (err, data, fields) {
    if (err) next(err);
    res.status(200).json(data)
    console.log(data)
    //res.render('imports-list.ejs', { title: 'Imports Colombia July 2020 - Sep 2020', importData: data});  
    });
});

router.get('/query-by-importer', function(req, res, next) {
    
    var sql= `SELECT NIT_Importador, Importador, Proveedor_Extranjero as 'Exportador', Subpartida_Arancelaria as 'Subpartida', ROUND(SUM(FOB),2) AS 'Total FOB', ROUND(AVG(Factor_Importacion), 2) AS 'Promedio Factor de Importacion', 
    COUNT(Num_Formulario) as 'Cant. Importaciones' 
    FROM (SELECT * 
        FROM colombia_imports 
        WHERE YEAR(Fecha_Transaccion) BETWEEN ${req.query.syear} AND ${req.query.fyear}
        AND MONTH(Fecha_Transaccion) BETWEEN ${req.query.smonth} AND ${req.query.fmonth}
        AND Importador LIKE '%${req.query.searchInput}%') as imports_filtered
    GROUP BY 1, 2, 3, 4
    ORDER BY 5 DESC, 3, 2;`;
    db.query(sql, function (err, data, fields) {
        if (err) next(err);
        res.status(200).json(data)
    //res.render('imports-list.ejs', { title: 'Imports Colombia July 2020 - Sep 2020', importData: data});  
    });
});

router.post('/register', async(req, res) => {
    console.log(req)
    req.body.password = bcrypt.hashSync(req.body.password)
    var sql = `INSERT INTO Users (username, password) 
        VALUES('${req.body.username}', '${req.body.password}')`
    db.query(sql, function (err, data, fields) {
        if (err) console.log(err);
        res.status(200);
    })
});

router.post('/signin', function(req, res, next){    
    var sql = `SELECT * 
               FROM Users 
               where username = '${req.body.username}'`
    db.query(sql, function (err, data, fields) {
        if (err){
            return res.status(404).send("Usuario no encontrado");
        } 
        var passwordIsValid = bcrypt.compareSync(req.body.password, data[0].password);
        if (!passwordIsValid){
            return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!"})
        }else{
            res.status(200).send({userId: data[0].id})
        }
    })
});

router.post('/savequeries', async(req, res) => {
    var sql = `INSERT INTO Queries (name, user_id,
        search_type, search_input, end_year, start_year, 
        end_month, start_month) 
        VALUES('${req.body.name}', '${req.body.userId}', 
        '${req.body.searchType}', '${req.body.searchInput}',
        ${req.body.endYear}, ${req.body.startYear},
        ${req.body.endMonth}, ${req.body.startMonth})`
    db.query(sql, function (err, data, fields) {
        if (err) console.log(err);
        res.status(200).send();
    })
});

router.get('/get-queries', async(req, res) => {
    var sql = `SELECT * FROM Queries WHERE user_id = 1`
    db.query(sql, function (err, data, fields){
        if (err) console.log(err);
        res.status(200).json(data)
    })
});

router.post('/save-supplier', async(req, res) => {

    var sql = `INSERT INTO Suppliers (Importador, NIT, userId) 
        VALUES('${req.body.importador}', '${req.body.nit}', 
        '${req.body.user_id}')`
    db.query(sql, function (err, data, fields) {
        if (err) console.log(err);
        res.status(200).send();
    })
});

router.get('/get-suppliers', async(req, res) => {
    var sql = `SELECT Importador, NIT FROM Suppliers WHERE userId = 1`
    db.query(sql, function (err, data, fields){
        if (err) console.log(err);
        res.status(200).json(data)
    })
});

module.exports = router;