var express = require('express');
var router = express.Router();
var $sql = require('../sqlMap');

const dbFileName = 'daily.db3';
var sqlite3 = require("sqlite3").verbose();

// TODO: multi user
const userName = 'admin';
const team = 'default';

// get all original daily infos
router.get('/getAllData', (req, res) => {
    const sql = $sql.myDaily.getAllData;
    const db = new sqlite3.Database('server/db/' + dbFileName, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
    db.serialize(() => {
        db.all(sql, (err, allRows) => {
            if (err != null) {
                console.log(err);
            }
            res.send(allRows);
        });
    });
    db.close();
});

// import origin daily info data
router.post('/importOriginData', (req, res) => {
    const sql = $sql.myDaily.importOriginData;
    const db = new sqlite3.Database('server/db/' + dbFileName);
    let params = req.body.infos;
    try {
        db.serialize(() => {
            db.run('BEGIN');
            params.forEach(param => {
                db.run(sql, param);
            });
            db.run('COMMIT');
        });
        console.log('done');
    } catch (error) {
        console.log(error);
    } finally {
        db.close();
    }
});






module.exports = router;