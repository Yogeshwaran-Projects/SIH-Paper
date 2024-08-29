const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5003;

// Import your scraping functions
const scrapeGoogleScholar = require('./scraper/googleScraper');
const getPublicationsByIdentifier = require('./scraper/WebofsciScraper');
const wossearch = require('./scraper/wossearch'); // Ensure correct path

const dataDir = path.join(__dirname, 'data');

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// In-memory database (replace this with a real database like MongoDB, MySQL, etc.)
let users = [];
let userCounter = 0; // Counter to generate unique numeric IDs

// Function to generate a new user ID
function generateUserId() {
  userCounter += 1; // Increment the counter
  const userId = `78612${String(userCounter).padStart(3, '0')}`; // Format as papers00001
  return userId;
}

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
  console.log('Data directory created successfully.');
}

// Define routes
app.get('/', (req, res) => {
  fs.rm(dataDir, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error(`Error deleting directory ${dataDir}:`, err);
    } else {
      console.log(`Directory ${dataDir} deleted successfully.`);
    }
  });
  res.send('Happy web scraping');
});

app.get('/api/v1/googlescholaruser', (req, res) => {
  fs.readFile(path.join(dataDir, 'googleScholarDetailedData.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data file');
    } else {
      console.log('Data returned from API:', JSON.parse(data));
      res.json(JSON.parse(data));
    }
  });
});

app.get('/api/v1/webofscience', (req, res) => {
  fs.readFile(path.join(dataDir, 'webOfScienceData.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data file');
    } else {
      console.log('Data returned from API:', JSON.parse(data));
      res.json(JSON.parse(data));
    }
  });
});

// Endpoint to trigger Google Scholar scraping
app.post('/api/scrape/googlescholar', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    await scrapeGoogleScholar(url);
    res.status(200).send('Scraping Google Scholar profile initiated');
  } catch (error) {
    console.error('Error during scraping:', error);
    res.status(500).send('Error initiating Google Scholar scraping');
  }
});

// Endpoint to trigger Web of Science scraping
app.post('/api/scrape/webofscience', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    await getPublicationsByIdentifier(url);
    res.status(200).send('Scraping Web of Science profile initiated');
  } catch (error) {
    console.error('Error during scraping:', error);
    res.status(500).send('Error initiating Web of Science scraping');
  }
});

app.post('/api/search', async (req, res) => {
  const { query } = req.body;
  console.log('Received query:', query); // Log the incoming query

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const papers = await wossearch(query);
    res.json(papers);
  } catch (error) {
    console.error('Error fetching papers:', error.message); // Log detailed error message
  }
});

// Endpoint to handle form submission
app.post('/api/saveUserData', (req, res) => {
  const {
    wosEmail,
    wosProfileLink,
    googleScholarEmail,
    googleScholarProfileLink
  } = req.body;

  // Generate a unique alphanumeric user ID
  const userId = generateUserId();

  // Create a user object
  const newUser = {
    userId,
    wosEmail: wosEmail || null,
    wosProfileLink: wosProfileLink || null,
    googleScholarEmail: googleScholarEmail || null,
    googleScholarProfileLink: googleScholarProfileLink || null,
  };

  // Store the user in the in-memory database (or save to a real database)
  users.push(newUser);

  console.log('User saved:', newUser); // Log user data for debugging

  res.json({ success: true, userId });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
