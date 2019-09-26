// node 后端服务器

const dailyApi = require('./api/dailyApi');
const myDailyApi = require('./api/myDailyApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api/daily', dailyApi);
app.use('/api/myDaily', myDailyApi);

// 监听端口
app.listen(3000);
// eslint-disable-next-line no-console
console.log('success listen at port:3000......');