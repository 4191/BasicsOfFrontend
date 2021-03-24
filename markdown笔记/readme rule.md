# xx服务 #

## Table of Contents
- [xx服务](#xx服务)
  - [Table of Contents](#table-of-contents)
  - [ENV](#env)
  - [Installation](#installation)
  - [Init](#init)
  - [Start](#start)
  - [ApiDocuments](#apidocuments)
  - [Maintenance](#maintenance)


## ENV
- [nodejs V8.11.1](#)
- [redhawk 6.5_x64](#)/[windows 7/10_x64](#)
- [chrome V74.0.3729.131](#)
- [pm2 V3.2.3](#)
- [Mysql V5.7.21](#)
- [Redis V4.0.10](#)
- [MongoDB V4.0.2](#)

## Installation

```bash
$ cd ${workspace}
$ git clone --branch [tagName] http://xx.xx.net/asw/xx-db-server.git
$ cd ./xx-db-server
$ npm install

```
## Init
初始化数据，包括数据库建库、建表、导入数据;
one terminal
```bash
$ cd ${workspace}/xx-db-server
$ node init/xxInit.js
$ node init/UserManageInit.js
$ node init/IoConfigFile.js
```
another terminal
```bash
$ mysql -u root -p******
mysql>drop database if exists xx;
mysql>create database xx;
mysql>grant all privileges on `xx`.* to 'xx'@'localhost' identified by 'xx';
mysql>flush privileges;
```

## Start
修改启动配置，将config文件的对应的数据库和服务端口修改成对应。
```bash
$ cd ${workspace}/xx-db-server
$ cat ./dist/config/config.json
$ vim ./dist/config/config.json
```
使用node启动项目 
```bash
$ cd ${workspace}
$ node xx-db-server
```

使用pm2启动项目
```bash
$ cd ${workspace}
$ pm2 start xx-db-server --watch
```

## ApiDocuments
xx数据库服务采用标准restful接口Api。
调用相关业务接口前需要登录，获得登录接口返回的token标识，用于后续接口请求的身份认证。
业务模型设计：
- 工程管理
- ICD设计
- IO配置
- 网络配置
- 绑定关系

接口详情见[接口说明文档](http://xx.xx.net/asw/xx-db-server/tree/master/doc/ICD接口说明文档.doc)
## Maintenance
查找代码问题时，首先备份数据，备份必要的代码；其次，采用最小修改原则，不要对代码动刀过多；再者，使用相应ide和命令行工具进行功能调试
- 代码远程调试
```bash
$ node --inspect-brk=xx.xx.xx.x:9229 xx-db-server
```
- 数据库复制
```bash
$ mysqldump xx -uroot -p123456 --add-drop-table | mysql bcdevelop -uroot -p123456
```
- 数据库数据导出
```bash
$ mysqldump xx -uroot -p123456 > ./xx.sql #此处或者用xx.sql的绝对路径
```
- 数据库数据导入
```bash
进入mysql
mysql> use xx;
mysql> source xx.sql #此处或者用xx.sql的绝对路径
```
- 数据库密码策略修改
```SHELL
mysql>set global validate_password_policy=0;
mysql>set global validate_password_length=1;
```
- 调试node_modules源码
```bash
$ node --inspect-brk .\apidoc\bin\apidoc --input ../dist --output ../dist/apidocfile
```
- 修改数据表字段默认值
```bash
mysql>alter table [tableName] alter column [colName] set default [value]
```
- 修改数据库表字段类型
```bash
mysql>alter table [tableName] modify column [colName] [type]
```
- 批量删除表结构
```
mysql>select  CONCAT('drop table ',table_name,';') from information_schema.tables where table_name REGEXP 't_icd_' and table_schema='xx';

```
