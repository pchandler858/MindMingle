# Mind Mingle - Social Media API

## Description

This is a social media API that allows users to perform various operations related to thoughts and reactions. Users can create, read, update, and delete thoughts, as well as add reactions to thoughts. The API also provides functionality to manage user relationships, including creating users, retrieving user information, updating user data, and deleting users.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the required dependencies by running the following command:

   `npm install`

4. Start the server by running the following command:

   `npm start`

## Usage

- Use an API development tool like Postman or Insomnia to interact with the API.
- The base URL for API requests is `http://localhost:<PORT>/api`.

## API Endpoints

### Users

- **GET /api/users**: Get all users.
- **GET /api/users/:id**: Get a user by ID.
- **POST /api/users**: Create a new user.
- **PUT /api/users/:id**: Update a user by ID.
- **DELETE /api/users/:id**: Delete a user by ID.

### Thoughts

- **GET /api/thoughts**: Get all thoughts.
- **GET /api/thoughts/:id**: Get a thought by ID.
- **POST /api/thoughts**: Create a new thought.
- **PUT /api/thoughts/:id**: Update a thought by ID.
- **DELETE /api/thoughts/:id**: Delete a thought by ID.

### Reactions

- **POST /api/thoughts/:thoughtId/reactions**: Add a reaction to a thought.
- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId**: Delete a reaction from a thought.

Please note that you need to replace `<PORT>` with the actual port number specified in your environment.

## Video Demonstration

For a video demonstration of the API and its usage, please refer to the following link: [Video Demonstration](https://youtu.be/USBEno9YwF8)

## Snapshot

![snapshot](/assets/screenshot.png)

Feel free to customize the content based on your project's specific details and requirements.
