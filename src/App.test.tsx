
import { getUniqueData, processCSV, getFilteredData } from './utils/csv-utils'

const dataText = `Date,Datasource,Campaign,Clicks,Impressions
01.01.2019,Facebook Ads,Like Ads,274,1979
01.01.2019,Facebook Ads,Offer Campaigns - Conversions,10245,764627
01.01.2019,Google Adwords,B2B - Leads,7,444
01.01.2019,Google Adwords,GDN Prospecting - App - Prio 1 Offer,16,12535
01.01.2019,Google Adwords,GDN Prospecting - App - Prio 2 Offer,93,18866
01.01.2019,Google Adwords,GDN Prospecting - Desktop - India Offer,72,59558
01.01.2019,Google Adwords,GDN Prospecting - Desktop - Prio 1 Offer,65,34592
01.01.2019,Google Adwords,GDN Prospecting - Desktop - Prio 2 Offer,26,20901
01.01.2019,Google Adwords,GDN Prospecting - Desktop - Prio 3 Offer,87,47845
01.01.2019,Google Adwords,GDN Prospecting - Desktop - Prio 4 Offer,263,106641`

test('test we get unique data',() => {
    const datasources = getUniqueData(dataText, 'Datasource')
    expect(datasources).toContain('Facebook Ads')
    expect(datasources).toContain('Google Adwords')
    expect(datasources.length).toBe(2)
})

test('Test we get a json array from csv', () => {
  const processedCSV = processCSV(dataText)
  expect(Array.isArray(processedCSV)).toBe(true)
  expect(processedCSV.length === 10).toBe(true)
  expect(processedCSV[0]).toEqual({
    Date: '01.01.2019',
    Datasource: 'Facebook Ads',
    Campaign: 'Like Ads',
    Clicks: '274',
    Impressions: '1979'
  })
})

test('Test data is filtered and expected number of data is returned', () => {
  const filteredData = getFilteredData(processCSV(dataText), ['Google Adwords'], [] )
  expect(filteredData.length).toBe(8)
})

test('Test data is filtered by exact criteria and expected data is returned', () => {
  const filteredData = getFilteredData(processCSV(dataText), ['Google Adwords'], ['GDN Prospecting - App - Prio 1 Offer'] )
  expect(filteredData[0]).toEqual({
    Date: '01.01.2019',
    Datasource: 'Google Adwords',
    Campaign: 'GDN Prospecting - App - Prio 1 Offer',
    Clicks: '16',
    Impressions: '12535'
  })
})

test('Test data is filtered with invalid filter and no data is not returned', () => {
  const filteredData = getFilteredData(processCSV(dataText), ['!Google Adwords'], [] )
  expect(filteredData.length).toBe(0)
})

