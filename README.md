---

# **DII Test — Backend Service**

This project is a backend service for the technical test of **PT Data Integrasi Inovasi**, built using **Node.js**, **TypeScript**, **Express**, and **Prisma ORM**.
The system is fully modular, supports JWT authentication (access & refresh tokens), request validation using Yup, and database management via Prisma.

---

## **🔗 Repository**

```
https://github.com/fauzan264/dii-test.git
```

---

# **🛠 Tech Stack**

* Node.js + TypeScript
* Express.js
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Yup Validation
* Nodemon (Development)

---

# **📁 Project Structure**

```
.
├── docs/
│   ├── api/
│   │   └── data-integrasi-inovasi-test.postman_collection.json
│   ├── dbdiagram.md           <-- ERD
│   └── excalidraw-link.md     <-- System Flow (Excalidraw)
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── generated/
│   ├── lib/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── index.ts
│
├── .env
├── .env.example
├── package.json
├── nodemon.json
└── tsconfig.json
```

---

# **🚀 Getting Started**

## **1. Clone Repository**

```bash
git clone https://github.com/fauzan264/dii-test.git
cd dii-test
```

---

## **2. Install Dependencies**

```bash
npm install
```

---

## **3. Environment Setup**

Use `.env.example` as the reference.

### **.env**

```
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database?pgbouncer=true"

# JWT Configuration
JWT_SECRET_KEY="your_secret_key_here"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
```

---

## **4. Database Setup (Prisma)**

### Generate Prisma Client

```bash
npm run prisma:generate
```

### Push Schema to Database

```bash
npx prisma db push
```

---

## **5. Run Database Seeder**

```bash
npm run prisma:seed
```

Seeder file:

```
./prisma/seed.js
```

---

## **6. Import Postman Collection**

File path:

```
./docs/api/data-integrasi-inovasi-test.postman_collection.json
```

This collection includes all available API endpoints.

---

## **7. Start the Server**

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

---

# **📘 Entity Relationship Diagram (ERD)**

The ERD is available at:

📄 `./docs/dbdiagram.md`

It is formatted for **dbdiagram.io**.

---

# **🔄 System Flow Diagram**

System flow diagrams are available at:

📄 `./docs/excalidraw-link.md`

This file contains the Excalidraw workflow links.

---

# **📌 Available Scripts**

| Command                   | Description                               |
| ------------------------- | ----------------------------------------- |
| `npm run dev`             | Start development server (nodemon)        |
| `npm run build`           | Compile TypeScript to JavaScript          |
| `npm start`               | Run production server                     |
| `npm run prisma:generate` | Generate Prisma client                    |
| `npm run prisma:seed`     | Run database seeding                      |
| `postinstall`             | Auto-generate Prisma client after install |

---

# **📦 API Testing**

Use the Postman collection:

```
docs/api/data-integrasi-inovasi-test.postman_collection.json
```

---

# **📄 License**

ISC License.

---
