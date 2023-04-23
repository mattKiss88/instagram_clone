# Instagram Clone

Welcome to the Instagram Clone project! This repository contains the source code for a fully functional, modern social media platform inspired by Instagram. The project is built using React for the frontend and Node, Express, Sequelize, and AWS S3 for the backend. The Instagram Clone allows users to share photos, follow other users, like and comment on posts, and much more.

## Features

- User authentication (register, login, and logout)
- Upload photos with captions
- Follow and unfollow other users
- View profiles with user posts and follower/following information
- Like and unlike posts
- Comment on posts
- Real-time notifications for likes, comments, and new followers
- Responsive design for mobile and desktop devices

## Tech Stack

### Frontend

- React.js: A popular JavaScript library for building user interfaces
- Redux: A predictable state container for JavaScript apps
- React Router: A library for handling in-app navigation
- Axios: Promise-based HTTP client for browser and Node.js

### Backend

- Node.js: A JavaScript runtime for server-side applications
- Express: A minimal and flexible web application framework for Node.js
- Sequelize: A promise-based ORM for Node.js and PostgreSQL
- PostgreSQL: A powerful, enterprise-class open-source object-relational database system
- AWS S3: A highly-scalable and reliable object storage service from Amazon Web Services

## Getting Started

To get started, follow these steps:

1. Clone the repository:

```
$ git clone https://github.com/yourusername/instagram-clone.git
$ cd instagram-clone
```

2. Install dependencies for the frontend and backend:

```
$ cd frontend
$ npm install
$ cd ../backend
$ npm install
```

3. Configure the environment variables for the backend:

```
$ cd backend
$ cp .env.example .env
```

Fill in the required values in the .env file, such as database credentials, AWS S3 configuration, and a JWT secret.

4. Create and set up the database:

```
$ npx sequelize-cli db:create
$ npx sequelize-cli db:migrate
```

5. Start the backend server:

```
$ npm start
```

6. Start the frontend development server:

```
$ cd ../frontend
$ npm start
```
