const ChartConfig = {
    options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ['01.01.2019']
        },
        yaxis: [
            {
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#008FFB'
                },
                labels: {
                    style: {
                        colors: '#008FFB',
                    }
                },
                title: {
                    text: "Clicks",
                    style: {
                        color: '#008FFB',
                    }
                }               
            },
            {
                axisTicks: {
                    show: true,
                },
                opposite: true,
                axisBorder: {
                    show: true,
                    color: '#00E396'
                },
                labels: {
                    style: {
                        colors: '#00E396',
                    }
                },
                title: {
                    text: "Impressions",
                    style: {
                        color: '#00E396',
                    }
                }                
            }
        ]
    },
    series : [
        {
          name: "Clicks",
          data: [30]
        },
        {
            name: "Impressions",
            data: [120]
        },
    ]
}

export default ChartConfig
