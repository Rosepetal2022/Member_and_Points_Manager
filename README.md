# Member and Points Manager

## Overview

This project is a full-stack web application for managing members and their points. It includes a Node.js/Express backend and a React frontend.

## Table of Contents

1. Overview  
2. Backend Setup  
   1. Clone the repository  
   2. Install dependencies  
   3. Environment Configuration  
   4. Create config.js  
   5. Start the backend server  
3. Frontend Setup  
   1. Navigate to the frontend directory  
   2. Install dependencies  
   3. Environment Configuration  
   4. Start the frontend server  
   5. Access the app locally  
4. Deployment

## Backend Setup

### Clone the repository

```bash
git clone https://github.com/Rosepetal2022/Member_and_Points_Manager.git
cd Member_and_Points_Manager/backend
```

### Install dependencies

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```
ACCESS_TOKEN_SECRET=...
ACCESS_TOKEN_SECRET_ADMIN=...
ACCESS_DB_URL=...
```

> For access to the required environment variables, please email [marcotter25yshoo.com.

### Create config.js

```js
const PORT = process.env.PORT || 8888;
module.exports = { PORT };
```

### Start the backend server

```bash
npm run dev
```

## Frontend Setup

### Navigate to the frontend directory

```bash
cd ../frontend/member_and_points_manager
```

### Install dependencies

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the frontend directory with the following content:

```
REACT_APP_API_URL=http://localhost:8888/api
```

### Start the frontend server

```bash
npm start
```

### Access the app locally

Open your browser and go to:

```
http://localhost:3000/
```

## Deployment

The application is deployed at:

🔗 [https://member-and-points-manager.uw.r.appspot.com/](https://member-and-points-manager.uw.r.appspot
