const XLSX = require('xlsx');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const workbook = XLSX.readFile('./Food sales.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

const jsonWithIds = data.map(entry => ({
  id: uuidv4(),
  ...entry
}));

fs.mkdirSync('./data', { recursive: true });
fs.writeFileSync('./data/foodData.json', JSON.stringify(jsonWithIds, null, 2));

console.log('Excel data exported to ./data/foodData.json');
