# Internal Ops Dashboard

A simple internal operations dashboard that allows users to submit, view, and manage support requests. Built with Node.js, Express, SQLite, and vanilla JavaScript. Includes a REST API and basic front-end UI.


## Features

- **CRUD API**: Create, Read, Update, Delete requests via REST endpoints
- **Database**: SQLite relational database with structured tables
- **Data Export**: Export requests as CSV
- **Frontend**: Simple dashboard to add and view requests
- **JSON Responses**: Structured data for internal systems

## Tech Stack

- Node.js
- Express
- SQLite
- HTML/CSS/JavaScript
- Git

## Installation

1. Clone the repo:
   git clone https://github.com/tcompy1/internal-ops-dashboard.git
2. Navigate to the folder:
   cd internal-ops-dashboard
3. Install dependencies:
   npm install
4. Start the server:
   node server.js
5. Open your browser at http://localhost:3000

## Usage
- Submit a new support request via the form
- Click "Refresh List" to view all requests
- Each request includes a title, description, and timestamp

## API Endpoints

- GET /api/request - returns all requets
- POST /api/request - adds a new request

## Author
Trent Compton

## Credits
- Built as part of portfolio project for learning Node.js, Express, and SQLite
