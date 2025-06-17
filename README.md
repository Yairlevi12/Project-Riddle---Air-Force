# Threat Monitoring Dashboard

The Golden Route system is tailored for decision-makers who need real-time insights into potential aerial threats. It lets you:

- **Input Coordinates**: Enter a location where an aircraft might originate.  
- **Set a Maximum Flight Radius**: Define how far out you want the system to look for aircraft.  
- **Calculate Threat Range**: See instantly whether any aircraft fall within that distance.  

Under the hood, the back end uses **TypeScript**, **Express**, and **Prisma**, while the front end runs on **Vite** and **React**. Everything is containerized with **Docker**, so deployment is as simple as:

```bash
docker-compose up
