/** 
 * 创建图表 
 */

const buildChart = {
    buildWorkloadCategoryChart(id, chartData, labels, title) {
        const ctx = id;
        const chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: chartData
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    },
}

export default buildChart;