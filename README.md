#  Threat Monitoring Dashboard 

The Golden Route system is tailored for decision-makers who need real-time insights into potential aerial threats. It lets you:

* **Input Coordinates**: Enter a location where an aircraft might originate.
* **Set a Maximum Flight Radius**: Define how far out you want the system to look for aircraft.
* **Calculate Threat Range**: See instantly whether any aircraft fall within that distance.

Under the hood, the back end uses TypeScript, Express, and Prisma, while the front end runs on Vite and React. Everything is containerized with Docker, so deployment is as simple as `docker-compose up`.

## What’s Inside

inside the system there is:

* ** Frontend – React
A clean interface where users enter their start and end points and see their route on a live map.

* ** Backend – Express & Prisma
Handles every request, runs the routing logic, and keeps track of all activity.

* ** Database – PostgreSQL
Safely stores locations, results, and statistics, with Prisma ensuring everything stays organized.

* ** Docker Compose
A configuration tool that uses a docker-compose.yml file to define and run all three services (frontend, backend, database) together as containers—automatically building images, setting up networks, and ensuring they start in the right order with a single command.
## Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/Yairlevi12/Project-Riddle---Air-Force.git
   cd Project-Riddle---Air-Force
   ```

2. **Launch everything**

   ```bash
   docker-compose up --build
   ```

3. **Enjoy!**

   * Front-end: [http://localhost:3000](http://localhost:3000)
   * API:        [http://localhost:4000](http://localhost:4000)


## Tech Stack

* **React** for crisp, responsive UI
* **Express** to power API routes
* **Prisma** ORM for type-safe database interactions
* **PostgreSQL** as our data store
* **Docker & Docker Compose** for one-step setup


---
