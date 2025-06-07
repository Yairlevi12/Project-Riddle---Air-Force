<<<<<<< HEAD
# Golden Route Threat Monitoring System

This project implements a full-stack application for threat monitoring, as described in the "חידת נתיב הזהב" challenge. It includes:

- **Front-end**: React application to input coordinates, display results, and show on map.
- **Back-end**: Express server with Prisma ORM connected to PostgreSQL, providing calculation and data storage endpoints.
- **Database**: PostgreSQL with Prisma schema.
- **Dockerized**: Full setup using Docker and Docker Compose for easy deployment.

## Project Structure

\`\`\`
golden_route_project/
├── client/                # React front-end
├── server/                # Express back-end
├── docker-compose.yml     # Docker Compose to run services
├── README.md
└── ...
\`\`\`

## Prerequisites

- Docker and Docker Compose installed on your system.

## Setup and Run

1. Clone the repository (or download the files).
2. Navigate to the project directory.
3. Run \`docker-compose up --build\`.
4. The front-end will be available at \`http://localhost:3000\`.
5. The back-end API will be available at \`http://localhost:4000\`.
6. Access the React app, input coordinates, calculate threat status, view on map, and save operations.

eact/Node.js application with PostgreSQL and Docker
>>>>>>> 6b174177cab410abe49b1a5fad80f933ea4c71eb
