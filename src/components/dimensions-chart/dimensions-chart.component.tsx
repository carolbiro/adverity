import Chart from "react-apexcharts"

const DimensionsChart: React.FC<any>= ( {options, series} ) => {
    return (<div id="chart">
            <Chart options={options} series={series} type="line" height={350} />
        </div>)
}

export default DimensionsChart