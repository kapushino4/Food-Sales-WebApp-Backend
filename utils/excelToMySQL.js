const XLSX = require('xlsx');
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');

const workbook = XLSX.readFile('./Food sales.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

async function importData() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@0995492539Za',
    database: 'fooddb'
  });

  for (const item of data) {
    const {
      Product,
      'Total Price (THB)': TotalPrice,
      OrderDate,
      Region,
      City,
      Category
    } = item;

    const formattedDate = new Date(
      (OrderDate - 25569) * 86400 * 1000
    ).toISOString().split('T')[0]; 

    let totalPriceNumber = Number(TotalPrice);
    if (isNaN(totalPriceNumber)) {
      totalPriceNumber = null;
    }

    await connection.execute(
      'INSERT INTO foods (id, Product, TotalPrice, OrderDate, Region, City, Category) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        uuidv4(),
        Product ?? null,
        totalPriceNumber,
        formattedDate ?? null,
        Region ?? null,
        City ?? null,
        Category ?? null
      ]
    );
  }

  console.log('Import สำเร็จแล้ว');
  await connection.end();
}

importData().catch(err => console.error('❌ Error:', err));
