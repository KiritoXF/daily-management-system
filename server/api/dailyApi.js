/*

 * 这个文件及所有api都是 **没用** 的！
 * 仅为了以防万一留在这
 * 正确的api是 ** myDaily ** 

/* eslint-disable no-console */
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
 
// save daily info
router.post('/addDailyInfo', (req, res) => {
    const sql = $sql.daily.add;
    let params = req.body.infos;
    conn.query(sql, [[params]], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// update daily info
router.put('/updateDailyInfo', (req, res) => {
    const sql = $sql.daily.updateDailyInfo;
    let params = req.body.infos;
    conn.query(sql, [[params]], (err, result) => {
        console.log(sql, [[params]]);
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
})


// get all daily infos
router.get('/getAll', (req, res) => {
    const sql = $sql.daily.getAll;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});

// delete selected infos
router.post('/deleteSelected', (req, res) => {
    const sql = $sql.daily.deleteSelected;
    conn.query(sql, [[req.body.ids]], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result);
        }
    })
});

// down here useless. just for examples.
// 添加招募记录接口  
router.post('/addRecruitRecord', (req, res) => {
    const sql = $sql.recruitRecord.add;
    let params = req.body.records;
    conn.query(sql, [params], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查询所有招募记录
router.get('/getAll', (req, res) => {
    const sql = $sql.recruitRecord.getAll;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send(result);
        }
    })
});

// 查询干员信息
router.get('/getEmpInfo', (req, res) => {
    const sql = $sql.employee.getInfo;
    conn.query(sql, [req.body.name], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(sql, [req.body.name]);
            res.send(result);
        }
    })
})

module.exports = router;