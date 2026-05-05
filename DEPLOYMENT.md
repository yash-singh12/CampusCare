# Render Deployment (Free)

This project can be deployed as a single Render Web Service that serves the frontend and API from the same Express app.

## Prerequisites

- GitHub repo for this project
- MongoDB Atlas cluster and database user
- Gemini API key

## Steps

1. Push the repo to GitHub.
2. In Render, create a new Web Service and connect your repo.
3. Use these settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Runtime: Node
   - Plan: Free
4. Add environment variables in Render:
   - `MONGODB_URI`
   - `GEMINI_API_KEY`
5. Deploy the service.

## Optional: Seed Facilities

Run this once against the production database:

```bash
node server/seeds/seedFacilities.js
```

## Post-Deploy Checks

- Visit `https://<your-service>.onrender.com/`
- Open `/dashboard.html` and `/report.html`
- Confirm API responses:
  - `GET /api/facilities`
  - `GET /api/issues`

## Notes

- Render sets `PORT` automatically.
- Ensure MongoDB Atlas allows connections from Render or open access for development.
