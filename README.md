# daily-management-system


适用于个人的日报管理系统。支持导入导出 csv 表格，根据数据分析显示图表，查看个人工作情况的变化及趋势。

需要注意的是仅按照以下的步骤是运行不起来的。

适合Windows使用（大概）


## 介绍

[English version](./readme_EN.md) (not latest version)


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
npm run start
```

## 功能

主界面有导航，可以快速前往摸鱼网站。


在`个人日报系统`的主界面，可以通过导入 csv 文件，来生成周报数据。可以导出指定时间范围的数据。表格支持倒序和翻页查看。

在`新增周报`界面可以填写一周的周报，同时计算各种类的工作内容所占用的时间。

顶部的 tab 页还可切换查看统计图表。

`时间进度`可查看当前日/周/月/年的进度，~~来提醒自己又浪费了多少时间。~~ 比如 2020年4月24日 大约是当年进度的40%。

## 演示

![](https://github.com/KiritoXF/daily_management_system/blob/master/pictures/home_page.PNG)
![](https://github.com/KiritoXF/daily_management_system/blob/master/pictures/week_daily.PNG)
![](https://github.com/KiritoXF/daily_management_system/blob/master/pictures/daily_page.PNG)
![](https://github.com/KiritoXF/daily_management_system/blob/master/pictures/work_category_page.PNG)
![](https://github.com/KiritoXF/daily-management-system/blob/master/pictures/time_progress.PNG)
