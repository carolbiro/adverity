import React from 'react'
import CsvReader from './components/csv-reader/csv-reader.component'
import DataSelector from './components/data-selector/data-selector.component'
import ReactApexChart  from "react-apexcharts"
import { getUniqueData, processCSV, CSVValue, getFilteredData } from './utils/csv-utils'
import ChartConfig from './chart.config'

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

class App extends React.Component<IProps, IState> {
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
    if(state.csvArray.length > 0 ) {
      const filteredData = getFilteredData(state.csvArray, state.selectedDatasources, state.selectedCampaigns)
      if(filteredData.length < 1000){
        this.setState({
          options: {
            ...this.state.options,
            xaxis: {
              ...this.state.options.xaxis,
              categories: filteredData.flatMap(item => item.Date)
            }
          },
          series: [
            {
              name: "Clicks",
              data: filteredData.flatMap(item => parseInt(item.Clicks))
            },
            {
                name: "Impressions",
                data: filteredData.flatMap(item => parseInt(item.Impressions))
            }
          ]
        })
      }
      else {
        alert('Please refine your criteria. Too many results to draw(' + filteredData.length + ') on this chart!')
      }
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
        <div>
          <button onClick={this.updateCharts}>Update Chart!</button>
        </div>
        <div className="chart">
          <ReactApexChart  options={this.state.options} series={this.state.series} type="line" height={350} />
        </div>
      </div>
    )
  }
}

export default App
