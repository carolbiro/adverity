import * as _ from 'lodash'

export interface CSVValue {
    Campaign: string, 
    Clicks: string, 
    Datasource: string, 
    Date: string, 
    Impressions: string
}

export const processCSV = (str: string, delim=',') => {
    const headers = str.slice(0,str.indexOf('\n')).split(delim);
    const rows = str.slice(str.indexOf('\n')+1).split('\n');

    const newArray:CSVValue[] = rows.map( row => {
        const values = row.split(delim);
        const eachObject:CSVValue = headers.reduce((obj: any, header, i) => {
            obj[header] = values[i];
            return obj as CSVValue;
        }, {})
        return eachObject;
    })

    return newArray
}

export const getUniqueData = (str: string, data: string, delim=',') => {
    const headers = str.slice(0,str.indexOf('\n')).split(delim);
    const rows = str.slice(str.indexOf('\n')+1, str.lastIndexOf('\n')).split('\n')
    const dataIndex = headers.indexOf(data)

    const dataSourcesArray = rows.map( row => {
        const values = row.split(delim)
        return values[dataIndex]
    })

    return _.uniq(dataSourcesArray)
}

export const getFilteredData = (csvArray: CSVValue[], datasources: string[], campaigns:string[]) => {
    return csvArray
        .filter(el => datasources.length > 0 ? datasources.includes(el.Datasource) : el )
        .filter(el => campaigns.length > 0 ? campaigns.includes(el.Campaign) : el)

}
