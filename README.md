# Food Sales Backend API

Backend API สำหรับระบบจัดการข้อมูลขายอาหาร (Food Sales Management)

---

## รายละเอียดโปรเจกต์

ระบบ Backend นี้ถูกพัฒนาด้วย Node.js และ Express.js เพื่อให้บริการ REST API สำหรับจัดการข้อมูลเมนูอาหาร รวมถึงฟังก์ชัน CRUD (Create, Read, Update, Delete) และเชื่อมต่อกับฐานข้อมูล MySQL เพื่อจัดเก็บข้อมูลต่าง ๆ

---

## เทคโนโลยีที่ใช้

- Node.js v14.x ขึ้นไป  
- Express.js  
- MySQL  
- dotenv (สำหรับจัดการ Environment Variables)  
- express-validator (สำหรับตรวจสอบข้อมูลขาเข้า)  
- uuid (สำหรับสร้างรหัสเฉพาะของข้อมูล)  
- nodemon (สำหรับช่วยรันเซิร์ฟเวอร์ในระหว่างพัฒนา)

---

## โครงสร้างโปรเจกต์

food-sales-backend/
├── controllers/ # จัดเก็บโค้ดจัดการธุรกิจ (logic) ของ API
├── data/ # ไฟล์ข้อมูล (เช่นไฟล์ JSON หรือฐานข้อมูล)
├── middleware/ # ตัวจัดการ middleware (เช่น error handler)
├── models/ # โมเดลฐานข้อมูล (ถ้าใช้ ORM หรือ schema)
├── routes/ # กำหนดเส้นทาง API ต่าง ๆ
├── utils/ # ฟังก์ชันช่วยเหลือ
├── .env # ตัวแปรแวดล้อม (Environment variables)
├── package.json # รายการ dependencies และสคริปต์
├── server.js # จุดเริ่มต้นของโปรเจกต์ (main entry)
└── README.md # ไฟล์นี้

yaml
Copy
Edit

---

## การติดตั้งและใช้งาน

### ความต้องการระบบ

- Node.js (แนะนำ v14 ขึ้นไป) [ดาวน์โหลดที่นี่](https://nodejs.org/)  
- MySQL Server (หรือฐานข้อมูลที่ตั้งค่าไว้)  
- Git (สำหรับ clone โค้ด)

---

### ขั้นตอนติดตั้ง

1. **โคลนโปรเจกต์จาก GitHub**

```bash
git clone https://github.com/kapushino4/food-sales-backend.git
cd food-sales-backend
ติดตั้ง Dependencies

bash
Copy
Edit
npm install
สร้างไฟล์ .env

ในโฟลเดอร์หลักของโปรเจกต์ สร้างไฟล์ .env และเพิ่มข้อมูลตัวแปรแวดล้อม ดังตัวอย่าง:

ini
Copy
Edit
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=food_sales_db
ตั้งค่าฐานข้อมูล

สร้างฐานข้อมูล MySQL ชื่อ food_sales_db หรือชื่อที่กำหนดใน .env

นำเข้าโครงสร้างและข้อมูลเบื้องต้น (ถ้ามีไฟล์ SQL)

รันเซิร์ฟเวอร์

bash
Copy
Edit
npm start
หรือถ้าติดตั้ง nodemon

bash
Copy
Edit
node server
npm run dev
หลังจากรันเสร็จ เซิร์ฟเวอร์จะฟังที่ http://localhost:3001

API Endpoints หลัก (ตัวอย่าง)
Method Path คำอธิบาย
GET /api/foods ดึงรายการอาหารทั้งหมด
GET /api/foods/:id ดึงข้อมูลอาหารตาม ID
POST /api/foods เพิ่มรายการอาหารใหม่
PUT /api/foods/:id แก้ไขข้อมูลอาหารตาม ID
DELETE /api/foods/:id ลบรายการอาหารตาม ID
การจัดการ Error
โปรเจกต์นี้มี middleware สำหรับจัดการ error และส่งข้อความตอบกลับตามมาตรฐาน HTTP status code เช่น 400, 404, 500

การใช้งานร่วมกับ Frontend
โปรดตรวจสอบให้แน่ใจว่า URL API ถูกต้องและเปิดใช้งานอยู่ตามพอร์ตที่กำหนด

หากใช้งานในเครื่องเดียวกัน ให้ตั้งค่า URL API ใน frontend ให้ตรงกับ backend ตัวอย่าง:
http://localhost:3001/api/foods

คำแนะนำเพิ่มเติม
แนะนำใช้ Postman หรือ Insomnia ในการทดสอบ API

ตรวจสอบการตั้งค่า CORS (ถ้ามี) ใน backend เพื่ออนุญาตให้ frontend เชื่อมต่อ

ติดต่อ
ผู้พัฒนา: nattanon deesom
Email: nattanon.des@gmail.com
โทร: 084-983-6678

