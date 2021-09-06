import React, { Component } from 'react'
import CsvReader from './components/csv-reader/csv-reader.component'
import DataSelector from './components/data-selector/data-selector.component'
import Chart from "react-apexcharts"
import { getUniqueData, processCSV, CSVValue, getFilteredData } from './utils/csv-utils'
import ChartConfig from './components/dimensions-chart/dimensions-chart.config'

import './App.scss';

interface IProps  {}
interface IState  {
  options: any
  series: any
  csvFile: any
  csvArray: CSVValue[]
  datasources: string[]
  campaigns: string[]
  selectedDatasources: string[]
  selectedCampaigns: string[]
}

class App extends Component<IProps, IState> {
  constructor(props:any) {
    super(props)

    this.state = {
      options : ChartConfig.options,
      series: ChartConfig.series,
      csvFile: null,
      csvArray: [],
      datasources: [],
      campaigns: [],
      selectedDatasources: [],
      selectedCampaigns: []
    }
  }

  handleCsvFileChange = (csvFile: File | null) => {
    this.setState({ csvFile : csvFile })
  }

  handleCsvFileSubmit = () => {
    if(this.state.csvFile) {
      const reader = new FileReader(); 
      reader.readAsText(this.state.csvFile) 
      reader.onload = e => {
          const text = e.target ?  e.target.result : null
          const datasources = getUniqueData(text as string, 'Datasource')
          const campaigns = getUniqueData(text as string, 'Campaign')
          this.setState({ 
            csvArray : processCSV(text as string), 
            datasources: datasources,
            campaigns: campaigns,
            selectedDatasources: datasources,
            selectedCampaigns: campaigns
          })
      }
    }
  }

  handleDatasourceSelect = (e:any) => {
    const selectedOptions: any[] = Array.from(e.target.parentElement.selectedOptions)
    this.setState({ selectedDatasources: selectedOptions.map(x => x.value)})
  }

  handleCampaignSelect = (e:any) => {
    const selectedOptions: any[] = Array.from(e.target.parentElement.selectedOptions)
    this.setState({ selectedCampaigns : selectedOptions.map(x => x.value)})
  }

  updateCharts = () => {
    const state = this.state
    if(this.state.csvArray.length > 0 ) {
      const filteredData = getFilteredData(state.csvArray, state.selectedDatasources, state.selectedCampaigns)

      const options = ChartConfig.options
      options.xaxis.categories = filteredData.flatMap(item => item.Date)

      const series = ChartConfig.series
      series[0].data = filteredData.flatMap(item => parseInt(item.Clicks))
      series[1].data = filteredData.flatMap(item => parseInt(item.Impressions))
      
      this.setState({
        options: options,
        series: series
      })
    }
  }

  componentDidMount() {
    this.updateCharts()
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CsvReader 
            onCsvFileChange={this.handleCsvFileChange}
            onCsvFileSubmit={this.handleCsvFileSubmit}
          />
        </header>
        <DataSelector
          datasources={this.state.datasources}
          campaigns={this.state.campaigns}
          onDatasourcesSelect={this.handleDatasourceSelect}
          onCampaignSelect={this.handleCampaignSelect}
        />
        <p className="col">
            <button onClick={this.updateCharts}>Update!</button>
          </p>
        <div className="chart">
          <Chart options={this.state.options} series={this.state.series} type="line" height={350} />
        </div>
      </div>
    )
  }
}

// const App: React.FC = () => {

//   const [options, setOptions] = useState(ChartConfig.options)
//   const [series, setSeries] = useState(ChartConfig.series)
  
//   const [csvFile , setCsvFile] = useState<File | null>()
//   const [csvArray, setCsvArray] = useState<CSVValue[]>([])
//   const [selectedDatasources, setSelectedDatasources] = useState<string[]>([])
//   const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])

//   const [datasources, setDatasources] = useState<string[]>([])
//   const [campaigns, setCampaigns] = useState<string[]>([])

//   const handleCsvFileChange = (csvFile: File | null) => {
//     setCsvFile(csvFile)
//   }

//   const handleCsvFileSubmit = () => {
//     if(csvFile) {
//       const reader = new FileReader(); 
//       reader.readAsText(csvFile) 
//       reader.onload = e => {
//           const text = e.target ?  e.target.result : null
//           setCsvArray(processCSV(text as string))
//           const datasources = getUniqueData(text as string, 'Datasource')
//           setDatasources(datasources)
//           setSelectedDatasources(datasources)
//           const campaigns = getUniqueData(text as string, 'Campaign')
//           setCampaigns(campaigns)
//           setSelectedCampaigns(campaigns)
//       }
//     }
//   }

//   const handleDatasourceSelect = async (e:any) => {
//     const selectedOptions: any[] = Array.from(e.target.parentElement.selectedOptions)
//     setSelectedDatasources(selectedOptions.map(x => x.value))
//   }

//   const handleCampaignSelect = (e:any) => {
//     const selectedOptions: any[] = Array.from(e.target.parentElement.selectedOptions)
//     setSelectedCampaigns(selectedOptions.map(x => x.value))
//     updateChart()
//   }


//   const updateChart = () => {
//     if(csvArray.length > 0 ) {
//       const filteredData = getFilteredData(csvArray, selectedDatasources, selectedCampaigns)
//       console.log(selectedDatasources)
//       console.log(selectedCampaigns)
//       console.log(filteredData.length)
  
//       options.xaxis.categories = filteredData.flatMap(item => item.Date)
//       setOptions(options)
//       series[0].data = filteredData.flatMap(item => parseInt(item.Clicks))
//       series[1].data = filteredData.flatMap(item => parseInt(item.Impressions))
//       setSeries(series)
//       console.log(series)

//     }
//   }

//   useEffect(() => {
//     updateChart() 
//   }, [options, series])
  

//   return (
//     <div className="App">
//       <header className="App-header">
//         <CsvReader 
//           onCsvFileChange={handleCsvFileChange}
//           onCsvFileSubmit={handleCsvFileSubmit}
//         />
//       </header>
//       <DataSelector
//         datasources={datasources}
//         campaigns={campaigns}
//         onDatasourcesSelect={handleDatasourceSelect}
//         onCampaignSelect={handleCampaignSelect}
//       />
//       <div className="chart">
//         <Chart options={options} series={series} type="line" height={350} />
//       </div>
//     </div>
//   )
// }

export default App
