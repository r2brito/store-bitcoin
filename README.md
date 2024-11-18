# Store Bitcoin

# **Bitcoin Purchase and Email Notification Service**

This project is a **Bitcoin trading and notification service** built with **Node.js** and **NestJS**, integrated with the **Mercado Bitcoin API** for Bitcoin trading and **SendGrid** for email notifications. The system allows users to:

- View the current Bitcoin rates (buy and sell prices).
- Purchase Bitcoin using their account balance.
- Receive email notifications about their transactions.

---

## **Table of Contents**

- [Store Bitcoin](#store-bitcoin)
- [**Bitcoin Purchase and Email Notification Service**](#bitcoin-purchase-and-email-notification-service)
  - [**Table of Contents**](#table-of-contents)
  - [**Features**](#features)
  - [**Setup and Installation**](#setup-and-installation)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)

---

## **Features**

- Fetch real-time Bitcoin rates (buy, sell, last prices) via the Mercado Bitcoin API.
- Purchase Bitcoin by deducting from the user's account balance.
- Modular email sending with support for SendGrid.
- Email templates using Handlebars for rich email content.
- Scalable and extensible architecture with dependency injection.

## **Setup and Installation**

### Prerequisites

- Node.js v16+ installed.
- A SendGrid account with an API key.
- Mercado Bitcoin API access.

### Installation

1. Clone the repository:

   ```
   git clone git@github.com:r2brito/store-bitcoin.git
   cd store-bitcoin
   ```

2. Create container postgres

```
docker run --name postgres_bitcoin \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=bitcoin \
  -d -p 5433:5432 postgres:15
```

3. Install dependencies:

```
npm install
```

or

```
yarn install
```

4. Set up the .env file:

```
cp .env.example .env
```

5. Migration run

```
yarn typeorm migration:run -- -d src/shared/infra/typeorm/database/data-source.ts
```

6. Start the application:

```
npm run start
```

1. Postman json:
   [Store](./store.json)
