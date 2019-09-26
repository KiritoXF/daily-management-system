/** 
 * 创建图表 - 使用EChart
 */

const EChart = require('echarts');
const buildEChart = {

    /**
     * 绘制柱状图
     *
     * @param {String} id - EChart的id
     * @param {Array} seriesData - 图表的数据
     * @param {Array} xAxisLabels - 横轴标签
     * @param {String} seriesName - 图表的名称(每个数据的)
     */
    buildBarEChart(id, seriesData, xAxisLabels, seriesName) {
        const echart = EChart.init(document.getElementById(id));
        echart.setOption({
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: xAxisLabels,
                axisTick: {
                    alignWithLabel: true // 坐标轴刻度与标签对齐
                }
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: seriesName,
                type: 'bar',
                barWidth: '60%',
                data: seriesData
            }]
        });
    },

    /**
     * 绘制折线图
     *
     * @param {String} id - EChart的id
     * @param {Array} xAxisLabels - 横轴标签
     * @param {Array} seriesData - 图表的名称
     */
    buildLineEChart(id, chartTitle, xAxisLabels, legendData, seriesData) {
        const echart = EChart.init(document.getElementById(id));
        echart.setOption({
            title: {
                text: chartTitle
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: xAxisLabels,
                axisTick: {
                    alignWithLabel: true // 坐标轴刻度与标签对齐
                }
            },
            yAxis: {
                type: 'value'
            },
            legend: {
                data: legendData
            },
            series: seriesData
        });
    }
}

export default buildEChart;