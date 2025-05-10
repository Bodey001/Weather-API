# My Awesome Weather API

[![License]]

## Description

This is a backend API built with Node.js to retrieve weather forecast!

## Table of Contents

- [Descritption](#description)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Runnung the API](#running-the-api)
- [API Endpoints](#api-endpoints)
  - [/weather/forecast](#weather)
    - [`POST /weather/forecast`](#post-weather)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Getting Started

Follow these steps to get the Blog API running on your local machine.

### Prerequisites

Make sure your have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher is recommended)
- [npm](https://www.npmjs.com/) (or [yarn](https://yarnpkg.com/))
- [Docker](https://www.docker.com/)
- [redis](https://redis.github.io/ioredis/)

### Installation

Clone the respository:

```bash
git clone [https://github.com/Bodey001/Weather-API]
cd [Weather-API]
```

To install Redis image on Docker using terminal:
`docker pull redis`

To install dependencies using npm:
`npm install`

### Configuration

- Create a .env file in the root of the project
- Update the variables in the .env file with your specific configuration, such as:
  PORT=your-server-port

VISUAL_CROSSING_API_KEY=visual-crossing-api-key

REDIS_HOST=your-redis-host
REDIS_PORT=your-redis-port
REDIS_PASSWORD=your-redis-container-password

- In docker-compose.yml file, locate services.redis.command and insert:
  `redis-server --requirepass [your-redis-container-password]`

### Running the API

- Uuild the images(redis and backend) and start the docker containers:
  `docker-compose up`

- The API will be accessible at http://localhost:[PORT]

## API Endpoints

- Swagger Documentation available at http://localhost:[PORT]/api-docs

## Error Handling

The API follows standard HTTP status codes to indicate the outcome of requests

## Contributions

Contributions are welcome! Please follow these guidelines:

- Fork the repository.
- Create a new branch for your feature or bug fix (git checkout -b feature/your-feature-name).
- Make your changes and commit them (git commit -am 'Add feature for post tagging').
- Push to the branch (git push origin feature/your-feature-name).
- Create a new Pull Request.

Please ensure your code adheres to the existing style and includes appropriate tests.

## License

This project is licensed under the MIT License - see the https://www.google.com/search?q=LICENSE file for details.

## Contact

If you have any questions or suggestions, feel free to contact us at [[oyewunmi1010@gmail.com]] or through the issue tracker.
