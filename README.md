E-commerce Web Application

This is a simple e-commerce web application built with a stack of modern web technologies. You can follow the instructions below to understand how to set up and run the project.

Getting Started

This section explains how to run the project in your local environment.

Prerequisites

Before you begin, ensure you have the following software and tools installed:

Node.js

npm (Node Package Manager)

MongoDB

Redis (Optional but required for certain features)

Installation

Clone the project from this GitHub repository:

Copy code

```
git clone https://github.com/your-username/e-commerce-app.git

```

Navigate to the backend directory:

Copy code

```
cd backend
```

Install the required dependencies:

```
npm install

```

Start the backend server:

```
npm run dev

```

Open a new terminal or your preferred tool for running commands. Start your MongoDB server:

```
mongod

```

If you need Redis for specific features, make sure it's installed and running. In a WSL (Windows Subsystem for Linux) environment, you can manage Redis with the following commands:

Stop Redis:

``` 
sudo service redis-server stop
```

Start Redis:

```
sudo service redis-server start

```

Navigate to the client directory:

```
cd client
```

Install the required dependencies:

```
npm install
```

Start the client application:

```
npm run dev
```


The application will be accessible in your web browser at http://localhost:3000.

![ecommerce app gif](/client/public/mernStackEcommerce.gif)

thanks [mehmetseven](https://github.com/meseven)
