// server.js
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/mongodb.js';
import { Issue, Facility } from './config/schemas.js';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Serve static files from /public directory
app.use(express.static(path.join(__dirname, '../public')));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure Gemini API
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("GEMINI_API_KEY is not set in the .env file. Please set it.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Define a map for issue types to be used in prompts if needed, or rely on frontend labels
const issueTypeMapping = {
  dirty_restroom: "Dirty restroom",
  overflowing_bin: "Overflowing bin",
  no_dispenser: "No dispenser",
  no_water: "No water",
  safety_concern: "Safety concern",
  other: "Other",
};

/**
 * Helper function to generate priority using Gemini API
 * @param {string} issueType
 * @param {string} location
 * @param {string} description
 * @returns {Promise<string>}
 */
async function generatePriority(issueType, location, description) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Given an issue report with the following details:
Issue Type: ${issueTypeMapping[issueType] || issueType}
Location: ${location}
Description: ${description || 'N/A'}

Please categorize the priority of this issue as either 'Green', 'RED', or 'Blue'. Only output one of these three words.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim().toUpperCase();

    // Check if the response contains any of the expected priorities
    if (text.includes("RED")) {
      return "RED";
    } else if (text.includes("GREEN")) {
      return "GREEN";
    } else if (text.includes("BLUE")) {
      return "BLUE";
    } else {
      console.warn(`Gemini returned an unexpected priority: ${text}. Defaulting to BLUE.`);
      return "BLUE"; // Default to a low priority if unexpected output
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "BLUE"; // Default to a low priority on error
  }
}

// API endpoint for generating priority
app.post('/generate-priority', async (req, res) => {
  const { issueType, location, description } = req.body;

  if (!issueType || !location) {
    return res.status(400).json({ error: "Issue type and location are required." });
  }

  try {
    const priority = await generatePriority(issueType, location, description);
    res.json({ priority });
  } catch (error) {
    console.error("Failed to generate priority:", error);
    res.status(500).json({ error: "Failed to generate priority." });
  }
});

// API endpoint to retrieve all issues from MongoDB
app.get('/api/issues', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ created_at: -1 });
    res.json({ issues: issues || [] });
  } catch (err) {
    console.error('MongoDB fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch issues.' });
  }
});

// API endpoint to retrieve all facilities from MongoDB
app.get('/api/facilities', async (req, res) => {
    try {
        console.log('Fetching facilities from MongoDB...');
        const facilities = await Facility.find().sort({ name: 1 });

        console.log('Facilities data from MongoDB:', facilities);
        res.json({ facilities: facilities || [] });
    } catch (err) {
        console.error('MongoDB fetch error when fetching facilities:', err);
        res.status(500).json({ error: 'Failed to fetch facilities.' });
    }
});

// API endpoint to update an issue in MongoDB
app.put('/api/issues/:id', async (req, res) => {
  const { id } = req.params;
  const { status, action_remarks } = req.body;
  
  if (!id) {
    return res.status(400).json({ error: 'Issue ID is required.' });
  }
  
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      id,
      {
        status: status,
        action_remarks: action_remarks,
        updated_at: new Date()
      },
      { new: true }
    );
    
    if (updatedIssue) {
      res.json({ issue: updatedIssue });
    } else {
      res.status(404).json({ error: 'Issue not found.' });
    }
  } catch (err) {
    console.error('MongoDB update error:', err);
    res.status(500).json({ error: 'Failed to update issue.' });
  }
});

// Basic route for testing server status
app.get('/', (req, res) => {
  res.send('CampusCare Server is running!');
});

// POST /api/issues (with image upload)
app.post('/api/issues', upload.single('image'), async (req, res) => {
  try {
    const { issue_type, description, facility_id } = req.body;
    if (!issue_type || !facility_id) {
      return res.status(400).json({ error: 'issue_type and facility_id are required.' });
    }

    // Generate priority using Gemini
    let geminiPriority = 'BLUE';
    try {
      geminiPriority = await generatePriority(issue_type, facility_id, description);
    } catch (e) {
      console.warn('Gemini priority generation failed, defaulting to BLUE:', e);
    }
    let priority = 'Medium';
    if (geminiPriority === 'RED') priority = 'Critical';
    else if (geminiPriority === 'GREEN') priority = 'High';
    else if (geminiPriority === 'BLUE') priority = 'Low';

    // Handle image upload - stored as base64 in MongoDB
    let image_url = null;
    if (req.file) {
      // Convert image buffer to base64
      const base64Image = req.file.buffer.toString('base64');
      image_url = `data:${req.file.mimetype};base64,${base64Image}`;
    }

    // Create new issue document
    const newIssue = new Issue({
      issue_type,
      description,
      facility_id,
      status: 'Reported',
      priority,
      image_url
    });

    // Save to MongoDB
    const savedIssue = await newIssue.save();
    
    res.status(201).json({ message: 'Issue submitted successfully', data: savedIssue });
  } catch (err) {
    console.error('MongoDB insert error:', err);
    res.status(500).json({ error: 'Failed to submit issue.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`CampusCare Server listening at http://localhost:${port}`);
});