const ChartConfig = {
    options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: []
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
          data: []
        },
        {
            name: "Impressions",
            data: []
        },
    ]
}

export default ChartConfig
