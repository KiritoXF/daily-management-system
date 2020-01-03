/** 
 * 创建图表 - 使用 RoughViz 
 */

const roughViz = require('rough-viz');
const buildVizChart = {

    /**
     * 绘制柱状图
     *
     * @param {String} id - 容器的id
     * @param {Array} seriesData - 图表的数据
     * @param {Ayyay} xAxisLabels - 横轴标签
     * @param {String} title - 图表的标题
     */
    buildBarChart(id, seriesData, xAxisLabels, title) {
        new roughViz.Bar({
            element: id,
            data: {
                labels: xAxisLabels,
                values: seriesData.map(data => {return parseInt(data)})
            },
            color: '#3398DB',
            fillStyle: 'cross-hatch', // 填充样式
            fillWeight: 1,
            width: 1000,
            height: 600,
            margin: {top: 100, right: 20, bottom: 100, left: 100},
            roughness: 2, // 图表的杂乱度。数值越大，图表越乱。
            title: title,
            titleFontSize: '1rem', // 标题的字体大小
            xLabel: '工作种类',
            yLabel: '工作时间(h)'
        });
    },

    buildLineChart(id, chartTitle, xAxisLabels, legendData, seriesData) {
        // RoughVizChart对折线图的设计不符合用户习惯，其data只能是csv的格式，很反人类，因此不写了。
    }
}

export default buildVizChart;
