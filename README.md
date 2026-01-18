# 🧙‍♂️ Stranger Things Market (DApp)

**Stranger Things Market** เป็นแอปพลิเคชันแบบกระจายศูนย์ (Decentralized Application - DApp) ที่สร้างขึ้นบน **Ethereum Blockchain** เปิดโอกาสให้ผู้ใช้งานสามารถเชื่อมต่อกระเป๋าเงิน **MetaMask** เพื่อเลือกซื้อตัวละครจากซีรีส์ *Stranger Things* ในรูปแบบของ **Digital Asset**

---

## 🖼️ ตัวอย่างหน้าเว็บแอปพลิเคชัน
![Stranger Things Market](/homepage.jpeg)

---

## 🚀 Tech Stack

### Frontend

* **Next.js** (App Router)
* **TypeScript**
* **Tailwind CSS**

### Blockchain Interaction

* **Ethers.js (v6)**

### Smart Contract

* **Solidity** (version 0.8.0 ขึ้นไป)

### Wallet

* **MetaMask**

---

## 🛠 Key Features

### 🔐 Wallet Connection

* เชื่อมต่อกับ MetaMask
* ตรวจสอบสถานะแบบ Real-time

  * การสลับบัญชี (Account Changed)
  * การเปลี่ยน Network (Network Changed)

### 🧙 Character Marketplace

* แสดงรายการตัวละครทั้งหมดในระบบ
* แสดงข้อมูล

  * ชื่อ (Name)
  * รูปภาพ (Image)
  * ราคา (ETH)

### 🔗 Smart Contract Interaction

* ดึงข้อมูลตัวละครทั้งหมดจาก Blockchain
* ระบบซื้อตัวละครผ่าน Smart Contract
* ตรวจสอบสถานะความเป็นเจ้าของ

  * **Sold Out** (ถูกซื้อแล้ว)
  * **You Own This** (คุณเป็นเจ้าของ)

### 📜 Transaction History

* แสดงประวัติการซื้อขาย
* ดึงข้อมูลจาก **Event / Struct** ใน Smart Contract โดยตรง

---

## 📜 Smart Contract Details (`backend.sol`)

Smart Contract ทำหน้าที่จัดการข้อมูลตัวละครและบันทึกประวัติการซื้อขาย

### 🧙 Characters

มีตัวละครเริ่มต้นทั้งหมด **9 ตัว** ได้แก่:

* Eleven
* Mike
* Dustin
* Steve
* Nancy
* Will
* Lucas
* Max
* Jonathan

### 📦 Structs

```solidity
struct Character {
    uint id;
    string name;
    string image;
    uint price;
    address currentOwner;
}

struct Purchase {
    uint timestamp;
    string characterName;
    address buyer;
}
```

### ⚙️ Functions

* `buyCharacter(uint _id)`
  ฟังก์ชันสำหรับการซื้อตัวละคร (payable) โดยตรวจสอบว่าตัวละครยังไม่มีเจ้าของ

* `getAllCharacters()`
  เรียกดูข้อมูลตัวละครทั้งหมด

* `getHistory()`
  เรียกดูประวัติการทำธุรกรรมทั้งหมด

---

## ⚙️ Installation & Usage

### 1️⃣ Deploy Smart Contract

* นำไฟล์ `backend.sol` ไป Deploy ผ่าน

  * **Remix IDE**
* Deploy บน Testnet 

### 2️⃣ Configure Constants

* นำ **Contract Address** และ **ABI** ที่ได้จากการ Deploy
* ใส่ลงในไฟล์:

```ts
// constants/ethereum.ts
export const CONTRACT_ADDRESS = "0x...";
export const CONTRACT_ABI = [...];
```

### 3️⃣ Install Dependencies

```bash
npm install
npm install ethers
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

### 5️⃣ Connect Wallet

* เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`
* เชื่อมต่อ MetaMask
* เริ่มเลือกซื้อตัวละครได้ทันที 🎉

---

## 📌 Notes

* โปรเจกต์นี้เหมาะสำหรับการเรียนรู้

  * DApp Development
  * Smart Contract Interaction
  * Web3 + Next.js Integration
* แนะนำให้ใช้งานบน **Testnet** เท่านั้น

---

✨ *Stranger Things Market — Enter the Upside Down of Web3!*
