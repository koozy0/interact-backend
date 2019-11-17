This project was created with [Node.js](https://nodejs.org/en/) using [Express](https://expressjs.com/), [mongoDB](https://www.mongodb.com/download-center/community) and [socket.io](https://www.npmjs.com/package/socket.io).

## Required Configuration

Make sure you have [Node.js](https://nodejs.org/en/) and [mongoDB](https://www.mongodb.com/download-center/community) installed.

Create a `.env` file using `.env.example` for reference. Fill in the values as required.

## Routes

### Auth

| Method | Route      | Description                                            |
| :----- | :--------- | :----------------------------------------------------- |
| GET    | /auth/user | Fetch user data with the given user id                 |
| POST   | /auth      | Authenticate user with the given username and password |

### User

| Method | Route            | Description                             |
| :----- | :--------------- | :-------------------------------------- |
| GET    | /users/:username | Fetch user data with the given username |
| POST   | /users           | Create new user (secret key required)   |
| PUT    | /users/:username | Update user (pending)                   |
| DELETE | /users/:username | Delete user (pending)                   |

### Events

| Method | Route              | Description                            |
| :----- | :----------------- | :------------------------------------- |
| GET    | /events            | Fetch events                           |
| GET    | /events/:eventcode | Fetch events with a matching eventcode |
| POST   | /events            | Create new event                       |
| PUT    | /events/:eventcode | Update event (pending)                 |
| DELETE | /events/:eventcode | Delete event (pending)                 |

### Questions

| Method | Route                    | Description                         |
| :----- | :----------------------- | :---------------------------------- |
| GET    | /events/:event/questions | Fetch questions for the given event |
| POST   | /events/:event/questions | Create new question                 |
| PUT    | /questions/:eventcode    | Update event (pending)              |
| DELETE | /questions/:eventcode    | Delete event (pending)              |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server in the development mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm server`

Runs the server in the development mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The server will reload if you make edits.<br />
