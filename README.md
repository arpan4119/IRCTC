#  Railway Management System (IRCTC Clone)

A simple railway management system built using **Node.js, Express, MySQL**, and **Sequelize ORM**.

---

## **Prerequisites**

Ensure you have the following installed on your system before proceeding:

1. **Node.js** (v18 or later) - [Download](https://nodejs.org/)
2. **MySQL** - [Download](https://dev.mysql.com/downloads/)
3. **Sequelize CLI** - ORM for MySQL
4. **Postman** (optional) - For API testing [Download](https://www.postman.com/)
5. **Git** (optional) - If cloning the repository

---

## ⚡ **Installation Steps**

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/your-username/railway-management.git
cd railway-management
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Setup Environment Variables**
Create a `.env` file in the root directory and add the following details:
```
PORT=5000
DB_USER=root
DB_PASS=yourpassword
DB_NAME=railway_db
DB_HOST=127.0.0.1
JWT_SECRET=your_secret_key
```

### 4️⃣ **Setup MySQL Database**
- Open MySQL and create a new database manually:
  ```sql
  CREATE DATABASE irctc;
  ```

- Update `config/config.json` with your MySQL credentials:
  ```json
  {
    "development": {
      "username": "root",
      "password": "yourpassword",
      "database": "irctc",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  ```

### 5️⃣ **Run Database Migrations**
```sh
npx sequelize db:migrate
```

### 6️⃣ **Seed Initial Data (Optional)**
```sh
npx sequelize db:seed:all
```

---

## **Running the Server**
Start the application:
```sh
npm start
```
or (for development mode with auto-restart)
```sh
npm run dev
```

The server should now be running at **`http://localhost:5000`**.

---

##  **API Endpoints**

### Authentication
- **POST** `/api/auth/register` → Register User
- **POST** `/api/auth/login` → Login User

### Train Management
- **GET** `/api/trains` → Get Available Trains
- **POST** `/api/trains/add` → Add a New Train (**Admin Only**)
- **PUT** `/api/trains/update-seats/:trainId` -> Update Total Seat Number of a Train (**Admin Only**)

### Booking
- **POST** `/api/bookings/book` → Book a Ticket (Requires Authentication)
- **GET** `/api/bookings/:id` → Get Booking Details (Requires Authentication)

---

##  **Running Tests (Optional)**
```sh
npm test
```

---

## **Common Issues & Fixes**

1. **"Sequelize CLI Not Found"**  
   ```sh
   npm install -g sequelize-cli
   ```

2. **"Module Not Found" Errors**  
   ```sh
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **"MySQL Connection Failed"**  
   - Ensure MySQL is **running**
   - Check `.env` and `config.json` for correct **username/password**
   - Try connecting manually:
     ```sh
     mysql -u root -p
     ```

---

This **README.md** should cover all necessary installation steps, running instructions, and API details. Let me know if you need any modifications!
