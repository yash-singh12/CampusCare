***🌸 CampusCare***

Originally developed during a hackathon under the team name Priority Thread. Rebranded to CampusCare to reflect its mission and impact.

🛡️ Women’s Safety | 🏫 Campus Hygiene | 📱 QR-Based Reporting

------------------------------------------------------------
📖 Table of Contents

- Problem Statement
- Solution Overview
- Features
- Tech Stack
- Project Structure
- Installation
- Usage
- Deployment
- Team
- Contributing
- License
- Contact

------------------------------------------------------------
📌 Problem Statement

WS-01: Menstrual Hygiene Infrastructure in Educational Institutions

Many campuses lack adequate menstrual hygiene support—stocked dispensers, clean restrooms, disposal bins, and responsive policies. Students face discomfort and poor hygiene, while administrators lack visibility into on-ground conditions. There's no standardized or anonymous system to monitor, report, or improve these facilities.

------------------------------------------------------------
💡 Solution Overview

CampusCare is a web-based platform that empowers students to anonymously report menstrual hygiene issues using QR codes placed across campus. It provides:

- QR-based reporting for quick issue submission
- Admin dashboard to monitor reports and take action
- Accessible UI with dropdowns and responsive design
- Admin login for secure access to reports

------------------------------------------------------------
✨ Features

- Anonymous issue reporting via QR codes
- Admin dashboard with real-time report tracking
- Responsive design for mobile and desktop
- Dropdown-based issue categorization
- Secure login for administrators

------------------------------------------------------------
🧰 Tech Stack

Technology         | Purpose
------------------|------------------------
HTML/CSS/JS       | Frontend interface
Node.js           | Backend server
QR Code Integration | Anonymous reporting
GitHub Pages      | Deployment

------------------------------------------------------------
📁 Project Structure

```
campus-care/
├── public/                        # Frontend static files served to clients
│   ├── html/
│   │   ├── index.html           # Homepage
│   │   ├── dashboard.html       # Admin dashboard
│   │   └── report.html          # QR-based report form
│   ├── css/
│   │   └── style.css            # Styling (shared across all pages)
│   ├── js/
│   │   ├── script.js            # Navigation & authentication logic
│   │   ├── dashboard.js         # Dashboard functionality
│   │   └── report.js            # Report form handling
│   └── assets/
│       └── campuscare-logo.jpg  # Branding assets
├── server/                        # Backend code
│   ├── server.js                # Express server & API endpoints
│   ├── config/                  # Configuration files (future: DB config)
│   ├── routes/                  # API route handlers (future separation)
│   └── middleware/              # Custom middleware (future: auth, validation)
├── package.json                 # Node dependencies
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
└── README.md                    # Project documentation
```

------------------------------------------------------------
⚙️ Installation

1. Clone the repository:
   git clone https://github.com/Harsh-shrivastav/campus-care.git
   cd campus-care

2. Install dependencies:
   npm install

3. Set up environment variables:
   - Copy .env.example to .env
   - Add necessary config (SUPABASE_URL, SUPABASE_ANON_KEY, GEMINI_API_KEY)

4. Run the server:
   npm start
   The server will start at http://localhost:3001

5. Access the application:
   - Homepage: http://localhost:3001 or http://localhost:3001/html/index.html
   - Admin Dashboard: http://localhost:3001/html/dashboard.html
   - Report Form: http://localhost:3001/html/report.html

------------------------------------------------------------
📝 Development Notes

**Current Database:** Supabase (PostgreSQL)

**Upcoming Migration:** MongoDB
- The `/server/config/` directory is prepared for database abstraction
- Migration to MongoDB will be implemented in phases
- No changes needed to the frontend as the API remains consistent

**Project Architecture Benefits:**
- Clear separation of concerns: `/public` for frontend, `/server` for backend
- Modular structure enables easy feature addition and maintenance
- Database-agnostic API design simplifies future migrations
- Future route organization ready in `/server/routes/`
- Middleware support prepared in `/server/middleware/` for authentication & validation

------------------------------------------------------------
▶️ Usage

- Scan a QR code placed on campus to access the report form
- Submit hygiene-related issues anonymously
- Admins can log in to view and manage reports via the dashboard

------------------------------------------------------------
🚀 Deployment

Live at: https://harsh-shrivastav.github.io/campus-care/

------------------------------------------------------------
👥 Team

Team Name: Priority Thread  

Members: Harsh Shrivastava, Priyanshu Yadav, Yash Singh, MD Ehtesham

------------------------------------------------------------
🤝 Contributing

Contributions are welcome! Feel free to fork the repo, submit pull requests, or open issues.

------------------------------------------------------------
📄 License

This project is licensed under the MIT License.

------------------------------------------------------------
📣 Contact

GitHub: https://github.com/Harsh-shrivastav  
LinkedIn: https://www.linkedin.com/in/harsh-shrivastava/  

