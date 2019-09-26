# daily-management-system

基于Vue.js 2.5 + vue-router + webpack 4.31.0 + iView 3.4.2 + MySQL 5.7.26 + express

适用于个人的日报管理系统

## 使用

1. 安装依赖

```
npm install
```

2. 生成数据库

在Mysql数据库中运行`/server/db/origininfo.sql`生成表。

## 运行
### Development

```
npm run dev

// 启动数据库
npm run server
```

### Production(Build)

```bush
npm run build
```

## 功能

在`个人日报系统`的主界面，可以通过导入特定的txt文件，来生成周报数据。

在`新增周报`界面可以填写一周的周报，同时计算各种类的工作内容所占用的时间。