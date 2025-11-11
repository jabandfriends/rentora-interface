import Papa from 'papaparse'

export const parseCSVFile = (file: File): Promise<Array<any>> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data as Array<any>)
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}
