<<<<<<< HEAD:README.md
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
git clone https://github.com/your-repo/project.git
cd project
```

2️⃣ **Install dependencies for backend and frontend:**

```sh
cd backend
npm install
cd ../frontend
npm install
```

---

## 🏃 **Run the Project Automatically (Recommended)**

A script (`start.bat`) is provided for **Windows users** to start everything automatically.

### **1️⃣ Run `start.bat`**

Double-click the `start.bat` file, and it will:  
✅ Open **Ganache UI**  
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

- Open the **frontend** in your browser at `http://localhost:3000`.
- The backend runs at `http://localhost:3000/api`.
- Ganache UI must be running for blockchain interactions to work.

---

## ❓ **Troubleshooting**

🔹 **Port Already in Use?**  
If you see an error like `EADDRINUSE: address already in use`, stop any running instances and try again:

```sh
taskkill /F /IM node.exe
```

🔹 **Ganache UI Doesn't Start?**  
Make sure you have installed **Ganache** and set the correct path in `start.bat`.

🔹 **Contract Not Found?**  
If the frontend/backend can't find the contract, redeploy it:

```sh
cd backend
truffle migrate --reset
```

---

## 📌 **Conclusion**

This setup ensures a **smooth and automated process** for launching the project. If you run into any issues, feel free to ask for help! 🚀
=======
# Project Setup and Run Guide
>>>>>>> 6136b743e7a79f4b280dc69ffe8ff8ff47fb96d6:README.sh
