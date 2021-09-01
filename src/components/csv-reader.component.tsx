import React from 'react'
import { useState } from 'react'

const CsvReader: React.FC = () => {
    const [csvFile , setCsvFile] = useState<any>()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if(csvFile) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const text = e.target ?  e.target.result : null;
                console.log(parseCsv(text as string));
            }
    
            // reader.readAsText(csvFile)
        }
    }

    const parseCsv= (csv: string) => {
        let lines = csv.split("\n")

        const headerLines = lines.shift()
        const header = headerLines ? headerLines.split(",") : null

        lines.shift(); // get rid of definitions
        return header ? lines.map(line => {
          const bits = line.split(",")
          let obj:any = {}
          header.forEach((h, i) => obj[h] = bits[i]); // or use reduce here
          return obj;
        }) : null
      };


    return (
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    const csvFile = e.target.files ? e.target.files[0] : null
                    setCsvFile(csvFile)
                }}
            >
            </input>
            <br/>
            <button 
                onClick={handleSubmit}
            >
                Submit
            </button>
        </form>
    )
}

export default CsvReader