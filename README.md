***🌸 CampusCare***

Originally developed during a hackathon under the team name Priority Thread. Rebranded to CampusCare to reflect its mission and impact.

Women’s safety | Campus hygiene | QR-based reporting

---

## Table of Contents

- Problem Statement
- Solution Overview
- Features
- Tech Stack
- Project Structure
- Installation
- Environment Variables
- Usage
- API Endpoints
- Data Model
- Deployment Notes
- Team
- Contributing
- License

---

## Problem Statement

WS-01: Menstrual hygiene infrastructure in educational institutions.

Many campuses lack adequate menstrual hygiene support (stocked dispensers, clean restrooms, disposal bins, and responsive policies). Students face discomfort and poor hygiene, while administrators lack visibility into on-ground conditions. There is no standardized or anonymous system to monitor, report, or improve these facilities.

---

## Solution Overview

CampusCare is a web-based platform that empowers students to anonymously report menstrual hygiene issues using QR codes placed across campus. It provides:

- QR-based reporting for quick issue submission
- Admin dashboard to monitor reports and take action
- Responsive UI for mobile and desktop
- Priority classification powered by Gemini

---

## Features

- Anonymous issue reporting via QR codes
- Admin dashboard with report tracking and status updates
- Gemini-powered priority generation (Critical/High/Medium/Low)
- Image upload support stored in MongoDB
- Responsive design for mobile and desktop

---

## Tech Stack

Technology | Purpose
---|---
HTML/CSS/JS | Frontend interface
Node.js + Express | Backend server
MongoDB Atlas + Mongoose | Database
Gemini API | Priority classification
Multer | Image uploads

---

## Project Structure

```
campus-care/
├── public/                     # Frontend static files
│   ├── index.html              # Homepage
│   ├── dashboard.html          # Admin dashboard
│   ├── report.html             # QR-based report form
│   ├── html/                   # Legacy/alternate entry points
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── script.js
│   │   ├── dashboard.js
│   │   └── report.js
│   └── assets/
├── server/
│   ├── server.js               # Express server & API endpoints
│   ├── config/
│   │   ├── mongodb.js           # MongoDB connection
│   │   └── schemas.js           # Mongoose schemas
│   ├── routes/                 # Future route separation
│   ├── middleware/             # Future middleware
│   └── seeds/
│       └── seedFacilities.js    # Facility seed script
├── MONGODB_MIGRATION.md         # Migration guide and notes
├── package.json
└── README.md
```

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Harsh-shrivastav/campus-care.git
   cd campus-care
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server will start at http://localhost:3001.

---

## Environment Variables

Create a `.env` file at the project root with:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campuscare?retryWrites=true&w=majority
GEMINI_API_KEY=your_gemini_api_key
PORT=3001
```

See [MONGODB_MIGRATION.md](MONGODB_MIGRATION.md) for setup details.

---

## Usage

- Homepage: http://localhost:3001
- Admin dashboard: http://localhost:3001/dashboard.html
- Report form: http://localhost:3001/report.html

Optional: seed facilities before first use:

```bash
node server/seeds/seedFacilities.js
```

---

## API Endpoints

- `GET /api/issues` - List all issues
- `POST /api/issues` - Create a new issue (supports image upload)
- `PUT /api/issues/:id` - Update issue status and remarks
- `GET /api/facilities` - List facilities
- `POST /generate-priority` - Generate priority from issue details

---

## Data Model

**Issue**
- `issue_type`, `facility_id` (required)
- `description`, `image_url` (optional)
- `status` (Reported, In Progress, Resolved, On Hold)
- `priority` (Critical, High, Medium, Low)

**Facility**
- `facility_id` (unique)
- `name`, `building`, `floor`
- `room_number` (optional)

---

## Deployment Notes

Deployment is available. See [DEPLOYMENT.md](DEPLOYMENT.md) for Render steps.

---

## Team

Team Name: Priority Thread

Members: Harsh Shrivastava, Priyanshu Yadav, Yash Singh, MD Ehtesham

---

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License.

