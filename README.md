# 📝 **Project Setup and Run Guide**

This guide explains how to set up and run the project, including **Ganache UI, backend, and frontend**.

---

## 🚀 **Prerequisites**

Before running the project, make sure you have the following installed:

- **[Node.js](https://nodejs.org/)** (latest LTS version recommended)
- **[Ganache](https://trufflesuite.com/ganache/)** (for running a local blockchain)
- **[Truffle](https://trufflesuite.com/truffle/)** (optional, if using migrations)

---

## 🏗 **Installation**

1️⃣ **Clone the repository:**

```sh
git clone https://github.com/payton-ggg/blockchain-voting-system.git
cd blockchain-voting-system
```

2️⃣ **Install dependencies for backend and frontend:**

```sh
cd back
npm install
cd ../front
npm install
```

---

## 🏃 **Run the Project Automatically (Recommended)**

A script (`start.bat`) is provided for **Windows users** to start everything automatically. But you need to run Ganache UI as well

### **1️⃣ Run `install.bat`**

Double-click the `install.bat` file, and it will:  
✅ Install **dependencies**

### **2️⃣ Run `start.bat`**

Double-click the `start.bat` file, and it will:  
✅ Start **backend**  
✅ Start **frontend**

---

## 🏃 **Run the Project Manually**

### **1️⃣ Start Ganache UI**

- Open **Ganache** manually and create/start a new workspace.

### **2️⃣ Deploy Smart Contract** (if needed)

If you need to redeploy the contract, run:

```sh
cd backend
truffle migrate --reset
```

Copy `contract_adress` and paste it in .env file.

### **3️⃣ Start Backend**

```sh
cd backend
npm start
```

### **4️⃣ Start Frontend**

```sh
cd frontend
npm start
```

---

## 🎯 **Usage**

- Open the **frontend** in your browser at `http://localhost:5173`.
- The backend runs at `http://localhost:3000/api`.
- Ganache UI must be running for blockchain interactions to work.
