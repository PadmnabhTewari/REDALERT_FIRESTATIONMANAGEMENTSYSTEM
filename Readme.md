# 🚒 Fire Station Management System

A comprehensive web application for managing fire stations, including emergency response, staff management, vehicle maintenance, and supply chain operations.

## 🌟 Features

### 👥 User Management
- Role-based authentication (Admin, Staff)
- Secure login and session management
- User profile management

### 🏢 Fire Station Management
- Multiple station management
- Station details and contact information
- Resource allocation tracking

### 👨‍🚒 Staff Management
- Staff registration and profile management
- Role assignment
- Attendance tracking
- Contact information management

### 🚛 Vehicle Management
- Vehicle registration and tracking
- Maintenance scheduling
- Status monitoring (Available, In Use, Under Maintenance)
- Vehicle-station assignment

### 📋 Report Management
- Emergency incident reporting
- Report status tracking
- Detailed incident documentation
- Report filtering and search

### 🔧 Maintenance Management
- Vehicle maintenance scheduling
- Maintenance history tracking
- Service records management

### 📦 Supply Management
- Supplier registration and management
- Item inventory tracking
- Supply transactions
- Price management for items

### 📊 Dashboard
- Real-time statistics
- Emergency response metrics
- Resource utilization overview
- Station performance analytics

## 🛠️ Technology Stack

### Frontend
- React.js
- Tailwind CSS
- Axios for API calls
- React Router for navigation

### Backend
- Node.js
- Express.js
- MySQL Database
- JWT Authentication

## 📁 Project Structure

```
REDALERT_FIRESTATIONMANAGEMENTSYSTEM/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── staffController.js
│   │   ├── vehicleController.js
│   │   ├── reportController.js
│   │   ├── supplierController.js
│   │   ├── itemController.js
│   │   └── maintenanceController.js
│   ├── models/
│   │   ├── Staff.js
│   │   ├── Vehicle.js
│   │   ├── Report.js
│   │   ├── Supplier.js
│   │   ├── Item.js
│   │   └── Maintenance.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── staffRoutes.js
│   │   ├── vehicleRoutes.js
│   │   ├── reportRoutes.js
│   │   ├── supplierRoutes.js
│   │   ├── itemRoutes.js
│   │   └── maintenanceRoutes.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

4. Set up the database
- Create a MySQL database
- Import the SQL schema from `SQL/improving schema/improving_schema.sql`
- Configure the database connection in `.env`

5. Start the Backend Server
```bash
cd backend
npm start
```

6. Start the Frontend Development Server
```bash
cd frontend
npm start
```

## 🔐 Environment Variables

Create a `.env` file in the backend directory with the following variables:
```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=redalert
JWT_SECRET=your_jwt_secret
```

## 👥 User Roles

### Admin
- Full system access
- Manage staff and roles
- View and manage all reports
- Manage vehicles and maintenance
- Handle supply chain operations

### Staff
- Submit and view reports
- Update vehicle status
- View station information
- Access basic system features

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

# 🚒 Fire Station Management System  

A **React-based Fire Station Management System** for handling fire incidents, managing emergency vehicles, and tracking staff.  

---

## 📌 Features  
✅ **User Authentication** (Admin/User Login)  
✅ **Incident Reporting** (Fire Reports with location & details)  
✅ **Dashboard** (Overview of key stats)  
✅ **Vehicle Management** (Track fire trucks & emergency vehicles)  
✅ **Staff Management** (Manage firefighters & roles)  
✅ **Reports & Analytics** (Incident tracking with search & export)  
✅ **Settings Panel** (Manage stations, vehicles, roles)  

---

## 🛠 Tech Stack  
- **Frontend:** React.js (React Router, Hooks)  
- **Styling:** CSS (Dark theme, Animations)  
- **State Management:** useState  
- **Navigation:** React Router  

---

## 🚀 Installation & Setup  

1️⃣ **Clone this repository:**  
```sh
git clone https://github.com/yourusername/fire-station-management.git
cd fire-station-management
```

2️⃣ **Install dependencies:**  
```sh
npm install
```

3️⃣ **Start the development server:**  
```sh
npm start
```

4️⃣ **Open the app in the browser:**  
```
http://localhost:3000
```

---

## 📂 Project Structure  

```
FIRE-STATION-MANAGEMENT-SYSTEM/
├── backend/
├── frontend/
│   ├── node_modules/
│   │   └── index.html
│   └── src/
│       ├── components/
│       └── pages/
│           ├── Dashboard.css
│           ├── Dashboard.js
│           ├── Home.css
│           ├── Home.js
│           ├── Login.css
│           ├── Login.js
│           ├── Report.css
│           ├── Report.js
│           ├── Reports.css
│           ├── Reports.js
│           ├── Settings.js
│           ├── Staff.css
│           ├── Staff.js
│           ├── Vehicles.css
│           └── Vehicles.js
│       ├── App.css
│       ├── App.js
│       ├── index.css
│       └── index.js
└── ngrok-stable-linux-*

```

---

## 🖥 Available Pages  

| Page        | Path          | Description |
|-------------|--------------|-------------|
| Home        | `/`          | Landing page |
| Login       | `/login`     | User & Admin Login |
| Dashboard   | `/dashboard` | Overview of fire reports & resources |
| Report Fire | `/report`    | Submit new fire incidents |
| Vehicles    | `/vehicles`  | Manage fire trucks & emergency vehicles |
| Staff       | `/staff`     | Manage firefighter personnel |
| Reports     | `/reports`   | View fire incident records |
| Settings    | `/settings`  | Configure stations, vehicles, and roles |


  
