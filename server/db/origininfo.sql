/*
Navicat MySQL Data Transfer

Source Server         : default
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : dailysystem

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2019-09-20 10:30:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `origininfo`
-- ----------------------------
DROP TABLE IF EXISTS `origininfo`;
CREATE TABLE `origininfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeInterval` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `weeks` int(11) DEFAULT NULL,
  `coding` double DEFAULT NULL,
  `testing` double DEFAULT NULL,
  `documentWriting` double DEFAULT NULL,
  `selfStudying` double DEFAULT NULL,
  `translate` double DEFAULT NULL,
  `useless` double DEFAULT NULL,
  `weekWorkload` double DEFAULT NULL,
  `weekday` int(11) DEFAULT NULL,
  `averageWorkload` double DEFAULT NULL,
  `workSaturation` double DEFAULT NULL,
  `weekData` varchar(2555) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of origininfo
-- ----------------------------
INSERT INTO `origininfo` VALUES ('55', '20180806-0810', '1', '0', '0', '0', '37', '0', '3.5', '40.5', '5', '8.1', '0', null);
INSERT INTO `origininfo` VALUES ('56', '20180813-0817', '2', '0', '0', '0', '32.5', '0', '7.5', '40', '5', '8', '0', null);
INSERT INTO `origininfo` VALUES ('57', '20180820-0825', '3', '0', '0', '0', '30', '0', '0.5', '32', '5', '6.4', '0', null);
INSERT INTO `origininfo` VALUES ('58', '20180827-0831', '4', '0', '28', '0', '11.5', '0', '10.5', '50', '5', '10', '0.56', null);
INSERT INTO `origininfo` VALUES ('59', '20180903-0907', '5', '0', '21', '2', '6', '0', '11', '40', '5', '8', '0.575', null);
INSERT INTO `origininfo` VALUES ('60', '20180910-0914', '6', '0', '25', '3', '0', '0', '18', '46', '5', '9.2', '0.6086956521739131', null);
INSERT INTO `origininfo` VALUES ('61', '20180917-0921', '7', '0', '29', '7', '0', '0', '4', '40', '5', '8', '0.9', null);
INSERT INTO `origininfo` VALUES ('62', '20180925-0930', '8', '0', '31', '15', '2', '0', '5', '48', '6', '8', '0.9583333333333334', null);
INSERT INTO `origininfo` VALUES ('63', '20181001-1005', '9', '0', '0', '0', '0', '0', '0', '0', '0', '0', null, null);
INSERT INTO `origininfo` VALUES ('64', '20181008-1012', '10', '0', '19', '15', '6', '0', '0', '40', '5', '8', '0.85', null);
INSERT INTO `origininfo` VALUES ('65', '20181015-1019', '11', '0', '21', '7', '8', '0', '5', '41', '5', '8.2', '0.6829268292682927', null);
INSERT INTO `origininfo` VALUES ('66', '20181022-1026', '12', '3', '0', '0', '29', '0', '0', '40', '5', '8', '0.075', null);
INSERT INTO `origininfo` VALUES ('67', '20181029-1102', '13', '23', '0', '6', '0', '0', '3', '40', '5', '8', '0.725', null);
INSERT INTO `origininfo` VALUES ('68', '20181105-1109', '14', '25.5', '0', '11', '1', '0', '0', '40', '5', '8', '0.9125', null);
INSERT INTO `origininfo` VALUES ('69', '20181112-1116', '15', '28.5', '0', '7.5', '0', '0', '3', '40', '5', '8', '0.9', null);
INSERT INTO `origininfo` VALUES ('70', '20181119-1123', '16', '58.5', '0', '1', '0', '0', '0', '59.5', '6', '9.9', '1', null);
INSERT INTO `origininfo` VALUES ('71', '20181126-1130', '17', '16.5', '0', '9', '6.5', '0', '0', '32', '4', '8', '0.796875', null);
INSERT INTO `origininfo` VALUES ('72', '20181203-1207', '18', '3.5', '15', '2.5', '12', '0', '13', '46', '5', '9.2', '0.45652173913043476', null);
INSERT INTO `origininfo` VALUES ('73', '20181210-1215', '19', '17.5', '7', '6.5', '9.5', '0', '0', '40.5', '5', '8.1', '0.7654320987654321', null);
INSERT INTO `origininfo` VALUES ('74', '20181217-1221', '20', '13', '0', '6.5', '9', '0', '20', '48.5', '5', '9.7', '0.4020618556701031', null);
INSERT INTO `origininfo` VALUES ('75', '20181224-1229', '21', '5', '0', '4', '7', '0', '35.3', '51.3', '6', '8.6', '0.1754385964912281', null);
INSERT INTO `origininfo` VALUES ('76', '20190102-0104', '22', '2.5', '0', '4.5', '7.5', '0', '11.5', '26', '3', '8.7', '0.2692307692307692', null);
INSERT INTO `origininfo` VALUES ('77', '20190107-0111', '23', '27.5', '0', '1.5', '3', '0', '12.7', '44.7', '5', '8.74', '0.6487695749440715', null);
INSERT INTO `origininfo` VALUES ('78', '20190114-0118', '24', '19', '0', '0', '2.5', '0', '20.5', '42', '5', '8.4', '0.4523809523809524', null);
INSERT INTO `origininfo` VALUES ('79', '20190121-0125', '25', '26', '0', '0', '1', '0', '14', '41', '5', '8.2', '0.6341463414634146', null);
INSERT INTO `origininfo` VALUES ('80', '20190128-0203', '26', '13.5', '0', '0', '0.5', '0', '42.5', '56.5', '7', '8.1', '0.23893805309734514', null);
INSERT INTO `origininfo` VALUES ('81', '20190204-0210', '27', '0', '0', '0', '0', '0', '0', '0', '0', '0', null, null);
INSERT INTO `origininfo` VALUES ('82', '20190211-0215', '28', '6', '1', '0', '14.5', '0', '18.5', '40', '5', '8', '0.175', null);
INSERT INTO `origininfo` VALUES ('83', '20190218-0222', '29', '11', '0', '1', '12', '0', '16', '40', '5', '8', '0.3', null);
INSERT INTO `origininfo` VALUES ('84', '20190225-0301', '30', '32.7', '0', '0', '0', '0', '7.3', '40', '5', '8', '0.8175000000000001', null);
INSERT INTO `origininfo` VALUES ('85', '20190304-0308', '31', '11.5', '11', '7', '0', '0', '10.5', '40', '5', '8', '0.7375', null);
INSERT INTO `origininfo` VALUES ('86', '20190311-0315', '32', '21', '3.5', '1', '3.5', '0', '11', '40', '5', '8', '0.6375', null);
INSERT INTO `origininfo` VALUES ('87', '20190318-0322', '33', '4.5', '3', '6.5', '15.5', '0', '10.5', '40', '5', '8', '0.35', null);
INSERT INTO `origininfo` VALUES ('88', '20190325-0329', '34', '4.5', '0', '1', '21.5', '0', '13', '40', '5', '8', '0.1375', null);
INSERT INTO `origininfo` VALUES ('89', '20190401-0405', '35', '11.3', '0', '5.4', '2.5', '0', '12.8', '32', '4', '8', '0.5218750000000001', null);
INSERT INTO `origininfo` VALUES ('90', '20190408-0412', '36', '19', '0', '1.5', '2', '0', '18', '40.5', '5', '8.1', '0.5061728395061729', null);
INSERT INTO `origininfo` VALUES ('91', '20190415-0419', '37', '28', '0', '5.5', '0.5', '0', '6', '40', '5', '8', '0.8375', null);
INSERT INTO `origininfo` VALUES ('92', '20190422-0426', '38', '24.5', '0', '0', '0', '0', '23.5', '48', '6', '8', '0.5104166666666666', null);
INSERT INTO `origininfo` VALUES ('93', '20190429-0503', '39', '12', '0', '0', '5', '0', '7', '24', '3', '8', '0.5', null);
INSERT INTO `origininfo` VALUES ('94', '20190506-0510', '40', '19', '0', '1', '15', '0', '5', '40', '5', '8', '0.5', null);
INSERT INTO `origininfo` VALUES ('95', '20190513-0517', '41', '14', '0', '2.5', '10.5', '0', '13', '40', '5', '8', '0.4125', null);
INSERT INTO `origininfo` VALUES ('96', '20190520-0524', '42', '15.5', '0', '1', '14', '0', '9.5', '40', '5', '8', '0.4125', null);
INSERT INTO `origininfo` VALUES ('97', '20190527-0531', '43', '25.2', '0', '2', '0', '0', '12.8', '40', '5', '8', '0.6799999999999999', null);
INSERT INTO `origininfo` VALUES ('98', '20190603-0607', '44', '14', '0', '2', '10.5', '0', '5.5', '40', '4', '8', '0.4', null);
INSERT INTO `origininfo` VALUES ('99', '20190610-0614', '45', '33', '0', '0.5', '1.5', '0', '5', '40', '5', '8', '0.8375', null);
INSERT INTO `origininfo` VALUES ('100', '20190617-0621', '46', '31.5', '8.5', '0', '0', '0', '4', '46', '5', '9.2', '0.8695652173913043', null);
INSERT INTO `origininfo` VALUES ('101', '20190624-0628', '47', '33.5', '0', '1.5', '0', '0', '7', '42', '5', '8.4', '0.8333333333333334', null);
INSERT INTO `origininfo` VALUES ('102', '20190701-0705', '48', '31', '0', '1', '0', '0', '8', '40', '5', '8', '0.8', null);
INSERT INTO `origininfo` VALUES ('103', '20190708-0712', '49', '39.5', '0', '0', '0', '0', '4.5', '44', '5', '8.8', '0.8977272727272727', null);
INSERT INTO `origininfo` VALUES ('104', '20190715-0719', '50', '41.5', '0', '1', '0', '0', '11', '53.5', '5', '10.7', '0.794392523364486', null);
INSERT INTO `origininfo` VALUES ('105', '20190722-0726', '51', '17.7', '0', '1.5', '7.5', '0', '13.3', '40', '5', '8', '0.48', null);
INSERT INTO `origininfo` VALUES ('106', '20190729-0802', '52', '0', '0', '2', '23', '0', '15', '40', '5', '8', '0.05', null);
INSERT INTO `origininfo` VALUES ('107', '20190805-0809', '53', '31', '0', '0', '4.5', '0', '4.5', '40', '5', '8', '0.775', null);
INSERT INTO `origininfo` VALUES ('108', '20190812-0816', '54', '30', '0', '0', '2', '0', '0', '32', '5', '6.4', '0.9375', null);
INSERT INTO `origininfo` VALUES ('110', '20190819-20190825', '55', '20', '3.5', '0', '12.5', '1.5', '2.5', '40', '5', '8', '0.59', null);
INSERT INTO `origininfo` VALUES ('111', '20190826-0830', '56', '15', '0', '0', '20', '0', '5', '40', '5', '8', '0.375', null);
INSERT INTO `origininfo` VALUES ('112', '20190902-0906', '57', '8.5', '0', '0', '11.5', '0', '19', '40', '5', '8', '0.2125', null);
INSERT INTO `origininfo` VALUES ('120', '20190916-20190922', '59', '22', '3', '0', '3', '1.5', '2.5', '32', '4', '8', '0.78', '{\"monday\":{\"date\":\"2019-09-15T16:00:00.000Z\",\"workInfos\":[{\"workName\":\"改代码\",\"cost\":7.5,\"workCategory\":\"编码\",\"index\":1},{\"workName\":\"翻译协助\",\"cost\":0.5,\"workCategory\":\"翻译\",\"index\":2}],\"ps\":\"\",\"sumCost\":8},\"tuesday\":{\"date\":\"2019-09-16T16:00:00.000Z\",\"workInfos\":[{\"workName\":\"改代码\",\"cost\":6,\"workCategory\":\"编码\",\"index\":1},{\"workName\":\"翻译协助\",\"cost\":0.5,\"workCategory\":\"翻译\",\"index\":2},{\"workName\":\"测试\",\"cost\":1.5,\"workCategory\":\"测试\",\"index\":3}],\"ps\":\"\",\"sumCost\":8},\"wednesday\":{\"date\":\"2019-09-17T16:00:00.000Z\",\"workInfos\":[{\"workName\":\"改代码\",\"cost\":3.5,\"workCategory\":\"编码\",\"index\":1},{\"workName\":\"翻译协助\",\"cost\":0.5,\"workCategory\":\"翻译\",\"index\":2},{\"workName\":\"测试\",\"cost\":1.5,\"workCategory\":\"测试\",\"index\":3},{\"workName\":\"刷lintcode\",\"cost\":2.5,\"workCategory\":\"自学\",\"index\":4}],\"ps\":\"\",\"sumCost\":8},\"thursday\":{\"date\":\"2019-09-18T16:00:00.000Z\",\"workInfos\":[{\"workName\":\"技术调查\\t\",\"cost\":3,\"workCategory\":\"编码\",\"index\":1},{\"workName\":\"改代码\\t\",\"cost\":2,\"workCategory\":\"编码\",\"index\":2},{\"workName\":\"刷lintcode\\t\",\"cost\":0.5,\"workCategory\":\"自学\",\"index\":3},{\"workName\":\"摸鱼\\t\",\"cost\":2.5,\"workCategory\":\"准备工作\",\"index\":4}],\"ps\":\"\",\"sumCost\":8},\"friday\":{\"date\":\"2019-09-19T16:00:00.000Z\",\"workInfos\":[],\"ps\":\"\",\"sumCost\":0},\"saturday\":{\"date\":\"2019-09-20T16:00:00.000Z\",\"workInfos\":[],\"ps\":\"\",\"sumCost\":0},\"sunday\":{\"date\":\"2019-09-21T16:00:00.000Z\",\"workInfos\":[],\"ps\":\"\",\"sumCost\":0}}');
INSERT INTO `origininfo` VALUES ('121', '20190909-20190915', '58', '6', '0', '0', '18', '2', '6', '32', '4', '8', '0.19', '{\"monday\":{\"date\":\"2019-09-08T16:00:00.000Z\",\"workInfos\":[{\"workName\":\"做日报系统\",\"cost\":7.5,\"workCategory\":\"自学\",\"index\":1},{\"workName\":\"翻译协助\",\"cost\":0.5,\"workCategory\":\"翻译\",\"index\":2}],\"ps\":\"\",\"sumCost\":8},\"tuesday\":{\"date\":\"2019-09-09T16:00:00.000Z\",\"workInfos\":[{\"workName\":\"摸鱼\",\"cost\":3,\"workCategory\":\"准备工作\",\"index\":1},{\"workName\":\"做日报系统\",\"cost\":5,\"workCategory\":\"自学\",\"index\":2}],\"ps\":\"\",\"sumCost\":8},\"wednesday\":{\"date\":\"2019-09-10T16:00:00.000Z\",\"workInfos\":[{\"workName\":\"翻译协助\",\"cost\":1.5,\"workCategory\":\"翻译\",\"index\":1},{\"workName\":\"式样变更\",\"cost\":2,\"workCategory\":\"编码\",\"index\":2},{\"workName\":\"做日报系统\",\"cost\":2,\"workCategory\":\"自学\",\"index\":3},{\"workName\":\"摸鱼\",\"cost\":2.5,\"workCategory\":\"准备工作\",\"index\":4}],\"ps\":\"\",\"sumCost\":8},\"thursday\":{\"date\":\"2019-09-11T16:00:00.000Z\",\"workInfos\":[{\"workName\":\"开会\",\"cost\":0.5,\"workCategory\":\"准备工作\",\"index\":1},{\"workName\":\"改bug\",\"cost\":4,\"workCategory\":\"编码\",\"index\":2},{\"workName\":\"自学\",\"cost\":3.5,\"workCategory\":\"自学\",\"index\":3}],\"ps\":\"\",\"sumCost\":8},\"friday\":{\"date\":\"2019-09-12T16:00:00.000Z\",\"workInfos\":[],\"ps\":\"今日中秋节，休假\",\"sumCost\":0},\"saturday\":{\"date\":\"2019-09-13T16:00:00.000Z\",\"workInfos\":[],\"ps\":\"\",\"sumCost\":0},\"sunday\":{\"date\":\"2019-09-14T16:00:00.000Z\",\"workInfos\":[],\"ps\":\"\",\"sumCost\":0}}');
