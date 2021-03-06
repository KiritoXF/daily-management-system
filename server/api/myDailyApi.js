/* eslint-disable no-console */
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// TODO: multi user
const userName = 'admin';
const team = 'default';

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

// get all original daily infos - myDaily
// done
router.get('/getAllData', (req, res) => {
    const sql = $sql.myDaily.getAllData;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});

// get selected daily infos - myDaily
// done
router.get('/getSelectedWeek', (req, res) => {
    const sql = $sql.myDaily.getSelectedWeek;
    const weekNum = req.query.weekNum;
    conn.query(sql, [
        [weekNum]
    ], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});

// update weekDaily Data - myDaily
// done
router.put('/updateWeekData', (req, res) => {
    const sql = $sql.myDaily.updateWeekData;
    const infos = req.body.infos;
    infos.push(req.body.weeks);
    conn.query(sql, infos, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});

// delete target Week's daily record. - myDaily
// done
router.post('/deleteTargetInfo', (req, res) => {
    const sql = $sql.myDaily.deleteTargetInfo;
    conn.query(sql, [req.body.index], (err, result) => {
        console.log(sql, req.body.index)
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});

// import origin daily info data - myDaily
// done
router.post('/importOriginData', (req, res) => {
    const sql = $sql.myDaily.importOriginData;
    let params = req.body.infos;
    conn.query(sql, [params], (err, result) => {
        if (err) {
            console.log(sql, [params]);
            console.log("error: ", err);
        }
        if (result) {
            res.send(result);
        }
    })
});

// delete selected infos
// what the hell is this? never used.
router.post('/deleteSelected', (req, res) => {
    const sql = $sql.daily.deleteSelected;
    conn.query(sql, [
        [req.body.ids]
    ], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result);
        }
    })
});

// get settings - myDaily
// done
router.get('/getSettings', (req, res) => {
    const sql = $sql.myDaily.getSettings;
    conn.query(sql, [userName, team], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});

// update settings - myDaily
// done
router.put('/updateSettings', (req, res) => {
    const sql = $sql.myDaily.updateSettings;
    const settings = req.body;
    settings.push(userName);
    settings.push(team);
    conn.query(sql, settings, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});

// get all overtime records - myDaily
// done
router.get('/getAllOvertimeRecord', (req, res) => {
    const sql = $sql.myDaily.getAllOvertimeRecord;
    conn.query(sql, [userName, team], (err, records) => {
        if (err) {
            console.log(err);
        }
        if (records) {
            res.send(records);
        }
    })
});

// get selected overtime record - myDaily
// done
router.get('/getSelectedOvertimeRecord', (req, res) => {
    const sql = $sql.myDaily.getSelectedOvertimeRecord;
    const overtimeDate = req.query.overtimeDate;
    conn.query(sql, [
        [overtimeDate, userName, team]
    ], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});

// add overtime record - myDaily
// done
router.post('/addOvertimeRecord', (req, res) => {
    const sql = $sql.myDaily.addOvertimeRecord;
    let params = req.body;
    params.unshift(userName, team);
    conn.query(sql, [[params]], (err, result) => {
        if (err) {
            console.log(params.isVolunteer);
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});

// update overtime record - myDaily
// done
router.put('/updateOvertimeRecord', (req, res) => {
    const sql = $sql.myDaily.updateOvertimeRecord;
    conn.query(sql, req.body, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});

// delete target overtime record. - myDaily
router.post('/deleteSelectedOvertimeRecord', (req, res) => {
    const sql = $sql.myDaily.deleteSelectedOvertimeRecord;
    conn.query(sql, [req.body.overtimeDate, userName, team], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});

module.exports = router;