# Social Network API

## Description

This is a RESTful API for a social network built using Node.js, Express, and MongoDB. It allows users to create profiles, manage friends, post thoughts, and interact with reactions.

## Table of Contents

- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Thoughts](#thoughts)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- Body-Parser
- Validator

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/talitarosa/social-network-api.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd social-network-api
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up your MongoDB database**
   Make sure you have MongoDB running locally. You can start it using:
   ```bash
   mongod
   ```

5. **Start the server**
   ```bash
   node server.js
   ```

6. **API will be available at** `http://localhost:3000`.

## API Endpoints

### Users

- **GET /api/users**: Retrieve all users.
- **GET /api/users/:userId**: Retrieve a single user by ID.
- **POST /api/users**: Create a new user.
  - **Request Body**:
    ```json
    {
      "username": "exampleUser",
      "email": "user@example.com"
    }
    ```
- **PUT /api/users/:userId**: Update a user by ID.
- **DELETE /api/users/:userId**: Delete a user by ID.
- **POST /api/users/:userId/friends/:friendId**: Add a friend.
- **DELETE /api/users/:userId/friends/:friendId**: Remove a friend.

### Thoughts

- **GET /api/thoughts**: Retrieve all thoughts.
- **GET /api/thoughts/:thoughtId**: Retrieve a single thought by ID.
- **POST /api/thoughts**: Create a new thought.
  - **Request Body**:
    ```json
    {
      "thoughtText": "This is a thought.",
      "userId": "userId"
    }
    ```
- **DELETE /api/thoughts/:thoughtId**: Delete a thought by ID.
- **POST /api/thoughts/:thoughtId/reactions**: Add a reaction to a thought.
- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId**: Remove a reaction from a thought.

## Usage

You can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to interact with the API endpoints.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
