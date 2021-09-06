import React from 'react'

import './data-selector.styles.scss'

interface DataSelectorProps {
    datasources: string[],
    campaigns: string[],
    onDatasourcesSelect: React.MouseEventHandler<HTMLSelectElement>
    onCampaignSelect: React.MouseEventHandler<HTMLSelectElement>
}

const DataSelector: React.FC<DataSelectorProps> = (props:DataSelectorProps) => { 
    const {datasources, campaigns, onDatasourcesSelect, onCampaignSelect} = props

    return (<div className="data-selector">
        <div className="selectors">
            <h1>Filter dimension values</h1>
            <div className="field">
                <span className="title">Datasource</span>
                <select multiple onClick={onDatasourcesSelect}>
                {
                    datasources.map(item => (
                        <option key={item} className='option-field'> {item} </option>
                    ))
                }
                </select>
            </div>
            <div className="field">
                <span className="title">Campaign</span>
                <select multiple className="campaign" onClick={onCampaignSelect}>
                {
                    campaigns.map(item => (
                        <option key={item} className='option-field'> {item} </option>
                    ))
                }
                </select>
            </div>
        </div>
    </div>)
}

export default DataSelector