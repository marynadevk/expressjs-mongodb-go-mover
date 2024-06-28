# GoMover

## Description

This project is an Express.js API for a taxi service, enabling users to manage drivers and locate drivers near specific coordinates.

It utilizes the following technologies:

- MongoDB for data storage
- Mongoose for working with MongoDB
- Mocha and Supertest for testing

## Getting Started

To set up the project, follow these steps:

1. **Clone the repository:**

```sh
 git clone https://github.com/marynadevk/expressjs-mongodb-go-mover.git
 cd <project_directory>
```

2. **Install dependencies:**

```sh
  npm install
```

3. **Create a .env file with the same variables as in .env.example**


4. **Run application:**

```sh
  npm start
```

## API Endpoints

| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| POST   | `/api/drivers`     | Creates a new driver             |
| PUT    | `/api/drivers/:id` | Edits an existing driver by ID   |
| DELETE | `/api/drivers/:id` | Deletes an existing driver by ID |
| GET    | `/api/drivers`     | Lists drivers based on location  |
