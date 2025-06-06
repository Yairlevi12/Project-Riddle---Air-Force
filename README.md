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

## Uploading to GitHub

1. Initialize a new git repository:
   \`\`\`
   git init
   git add .
   git commit -m "Initial commit"
   \`\`\`
2. Create a new repository on GitHub (e.g., "golden-route").
3. Add the remote origin:
   \`\`\`
   git remote add origin https://github.com/YourUsername/golden-route.git
   git branch -M main
   git push -u origin main
   \`\`\`
4. Your project is now on GitHub.
=======
# Project-Riddle---Air-Force
Drone Threat Assessment System – React/Node.js application with PostgreSQL and Docker
>>>>>>> 6b174177cab410abe49b1a5fad80f933ea4c71eb
