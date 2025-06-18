const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const filePath = path.resolve('./data/foodData.json');
const { validationResult } = require('express-validator');

let foodDataCache = null;

async function loadFoodData() {
  if (foodDataCache) return foodDataCache;
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    foodDataCache = JSON.parse(file);
    return foodDataCache;
  } catch (err) {
    if (err.code === 'ENOENT') {
      // ถ้าไฟล์ไม่เจอ ให้สร้างไฟล์เปล่า
      foodDataCache = [];
      await saveFoodData(foodDataCache);
      return foodDataCache;
    }
    throw err;
  }
}

// บันทึกข้อมูลลงไฟล์ (async)
async function saveFoodData(data) {
  foodDataCache = data;
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

exports.getFoods = async (req, res, next) => {
  try {
    let { search, sort, start, end, page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 20;

    let results = await loadFoodData();

    // filter search
    if (search) {
      results = results.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    // filter date range (สมมติ OrderDate เป็น ISO string)
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      results = results.filter(item => {
        const itemDate = new Date(item.OrderDate);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    // sort
    if (sort && results[0] && results[0][sort] !== undefined) {
      results.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
    }

    // pagination
    const total = results.length;
    const startIndex = (page - 1) * limit;
    const paginatedResults = results.slice(startIndex, startIndex + limit);

    res.json({
      page,
      limit,
      total,
      data: paginatedResults,
    });
  } catch (error) {
    next(error);
  }
};

exports.addFood = async (req, res, next) => {
  try {
    // ตรวจสอบ validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newItem = { id: uuidv4(), ...req.body };

    const data = await loadFoodData();
    data.push(newItem);
    await saveFoodData(data);

    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

exports.updateFood = async (req, res, next) => {
  try {
    const { id } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await loadFoodData();
    const index = data.findIndex(item => item.id === id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });

    data[index] = { ...data[index], ...req.body };
    await saveFoodData(data);

    res.json(data[index]);
  } catch (error) {
    next(error);
  }
};

exports.deleteFood = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await loadFoodData();
    const filtered = data.filter(item => item.id !== id);

    if (filtered.length === data.length) {
      return res.status(404).json({ error: 'Not found' });
    }

    await saveFoodData(filtered);

    res.json({ message: 'Deleted' });
  } catch (error) {
    next(error);
  }
};
