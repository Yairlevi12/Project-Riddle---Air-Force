<<<<<<< HEAD
# Golden Route Threat Monitoring System

Full-stack threat monitoring solution for the “חידת נתיב הזהב” challenge:

* **Front-end (React)**
  Intuitive interface for entering coordinates, executing calculations, and visualizing results on an interactive map.

* **Back-end (Express + Prisma)**
  Robust API layer performing trajectory analysis, persisting each operation in PostgreSQL via Prisma ORM, and exposing secure endpoints.

* **Database (PostgreSQL)**
  Well-defined Prisma schema ensuring data integrity and optimized storage.

* **Containerized (Docker & Docker Compose)**
  End-to-end Docker configuration—simply clone the repository and run `docker-compose up` to launch the entire stack without additional setup.
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
