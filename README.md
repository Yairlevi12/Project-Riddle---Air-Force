#  Threat Monitoring Dashboard 

The Golden Route system is tailored for decision-makers who need real-time insights into potential aerial threats. It lets you:

* **Input Coordinates**: Enter a location where an aircraft might originate.
* **Set a Maximum Flight Radius**: Define how far out you want the system to look for aircraft.
* **Calculate Threat Range**: See instantly whether any aircraft fall within that distance.

Under the hood, the back end uses TypeScript, Express, and Prisma, while the front end runs on Vite and React. Everything is containerized with Docker, so deployment is as simple as `docker-compose up`.

## What’s Inside

Here’s what you’ll find when you dive in:

* **A Friendly Front-End (React)**
  Jump right in—pop in your coordinates, hit ‘Analyze’, and watch the path unfold on a live map.

* **Powerful API Engine (Express + Prisma)**
  Behind the scenes, our server crunches the numbers, logs every request, and keeps everything humming along.

* **Dependable Database (PostgreSQL)**
  Think of it as a trusty notebook: Prisma makes sure each entry is neat, tidy, and always ready when you need it.

* **One-Command Docker Launch**
  No more fiddling with installs—`docker-compose up` gets everything running in one go.

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

## Quick Tour

* **Add a Check**: Enter your starting and ending coordinates, then hit ‘Analyze.’
* **Map View**: Instantly see the path displayed on the map.
* **History Log**: Every check you run gets saved—and you can browse through past operations anytime.

## Tech Stack

* **React** for crisp, responsive UI
* **Express** to power API routes
* **Prisma** ORM for type-safe database interactions
* **PostgreSQL** as our data store
* **Docker & Docker Compose** for one-step setup


---
