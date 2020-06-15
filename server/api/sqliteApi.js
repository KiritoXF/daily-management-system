var express = require('express');
var router = express.Router();
var $sql = require('../sqlMap');

// db path is server/db/.
// db name is daily.db3
const dbFileName = 'server/db/daily.db3';

var sqlite3 = require("sqlite3").verbose();

// TODO: multi user
const userName = 'admin';
const team = 'default';

// get all original daily infos
router.get('/getAllData', (req, res) => {
    const sql = $sql.myDaily.getAllData;
    const db = new sqlite3.Database(dbFileName, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
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
    const db = new sqlite3.Database(dbFileName);
    let params = req.body.infos;
    try {
        db.serialize(() => {
            db.run('BEGIN');
            params.forEach(param => {
                db.run(sql, param);
            });
            res.send([]); // TODO: is this best?
            db.run('COMMIT');
        });
        console.log('done');
    } catch (error) {
        console.log(error);
    } finally {
        db.close();
    }
});

// get selected daily infos - myDaily
router.get('/getSelectedWeek', (req, res) => {
    const sql = $sql.myDaily.getSelectedWeek;
    const db = new sqlite3.Database(dbFileName);
    const weekNum = req.query.weekNum;
    db.all(sql, weekNum, (err, row) => {
        if (err != null) {
            // TODO: should anything be done here?
            console.log(err);
        }
        res.send(row);
        db.close();
    });
});

// update weekDaily Data - myDaily
router.put('/updateWeekData', (req, res) => {
    const sql = $sql.myDaily.updateWeekData;
    const db = new sqlite3.Database(dbFileName);
    const infos = req.body.infos;
    infos.push(req.body.weeks);
    db.all(sql, infos, (err, row) => {
        if (err != null) {
            console.log(err);
        }
        res.send(row);
    });
});

// delete target Week's daily record. - myDaily
router.post('/deleteTargetInfo', (req, res) => {
    const sql = $sql.myDaily.deleteTargetInfo;
    const db = new sqlite3.Database(dbFileName);
    db.all(sql, req.body.index, (err, row) => {
        if (err != null) {
            console.log(err);
        }
        res.send(row);
    })
});





module.exports = router;