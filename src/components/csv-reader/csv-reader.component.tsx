import React from 'react'

interface CsvReaderProps {
    onCsvFileChange: (csvFile: File | null) => void,
    onCsvFileSubmit: () => void
}

const CsvReader: React.FC<CsvReaderProps> = ( { onCsvFileChange, onCsvFileSubmit }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const csvFile = e.target.files ? e.target.files[0] : null
        onCsvFileChange(csvFile)
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onCsvFileSubmit()
    }

    return (
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={handleChange}
            />
            <button onClick={handleSubmit}>
                Submit
            </button>
        </form>
    )
}

export default CsvReader