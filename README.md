# Argent Bank APP

This codebase contains the code needed to run the backend & front end for Argent Bank.

## Getting Started

### Prerequisites

Argent Bank uses the following tech stack:

- [Node.js v12](https://nodejs.org/en/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

Please make sure you have the right versions and download both packages. You can verify this by using the following commands in your terminal:

```bash
# Check Node.js version
node --version

# Check Mongo version
mongo --version
```

### Instructions

1. Fork this repo
1. Clone the repo onto your computer
1. Open a terminal window in the cloned project
1. Go in the api folder and run the following commands in the project root:


```bash
# Install dependencies
npm install

# Start local dev server
npm run dev:server

# Populate database with two users
npm run populate-db
```

Your server should now be running at http://locahost:3001 and you will now have two users in your MongoDB database!

## Populated Database Data

Once you run the `populate-db` script, you should have two users in your database with 3 transactions each.:

### Tony Stark

- First Name: `Tony`
- Last Name: `Stark`
- Email: `tony@stark.com`
- Password: `password123`

### Steve Rogers

- First Name: `Steve`,
- Last Name: `Rogers`,
- Email: `steve@rogers.com`,
- Password: `password456`

## API Documentation

To learn more about how the API works, once you have started your local environment, you can visit: http://localhost:3001/api-docs

## Launching the Frontend

### Prerequisites

Argent Bank front end uses the React Vite template.
You will need to configure the frontend to point to your local backend. To do this, you will need to create in the project root a `.env.local` file and add the `VITE_API_URL` environment variable in it with the backend api url (http://localhost:3001/api/v1)

### Instructions

1. Open a terminal window in the project root
1. Run the following commands:

```bash
# Install dependencies
npm install

# To launch the frontend
npm run dev
```

Your front end should now be running at http://locahost:5173/.
