# EC2-API-PROJECT

## Project Overview
This project involves developing a simple API using a preferred programming language and a relational database management system (RDBMS). The API is deployed on an AWS EC2 instance and provides endpoints for student information retrieval.

## Features
- **Endpoint 1: `/students`**
  - Returns a JSON response containing a minimum of 10 students.
  - Each student includes their **name** and **enrolled program**.

- **Endpoint 2: `/students`**
  - Returns JSON data for a specific student identified by their **ID**.
  - Data includes **name**, **enrolled program**, and **scores** for each subject.

## Technologies Used
- **Backend:** (Express Node.js)
- **Version Control:** Git, GitHub
- **Deployment:** AWS EC2, Nginx/Apache

## Setup & Installation
1. **Clone the repository:**
   git clone https://github.com/CEO-LAYSON/EC2-API-PROJECT.git
   cd EC2-API-PROJECT

2. Install dependencies (if applicable):
   npm install  # For Node.js projects

3. run the project
   locally: node index.js
   live: endpoint1(http://51.21.251.240:5005/subjects) && endpoint2(http://51.21.251.240:5005/students)
## Understand Backup Schemes

- Full Backup: Backs up the entire system. Easy to restore. Takes more space and time.
- Incremental Backup: Only backs up what changed since the last backup. Saves space. Slower restore.
- Differential Backup: Backs up everything changed since last full backup. Faster restore. Medium space.

