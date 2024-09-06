const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Define the output directory and file
const dataDir = path.join(__dirname, '../data/');
const outputFile = path.join(dataDir, 'scopusData.json');

// Scopus API configuration
const apiKey = 'e0e1e386d41086b08ed1ae07c4619791'; // Your Scopus API key
const scopusBaseUrl = 'https://api.elsevier.com/content/search/scopus';

// Function to extract authorId from Scopus URL
const extractAuthorId = (url) => {
  const match = url.match(/authorId=(\d+)/);
  return match ? match[1] : null;
};

// Function to fetch publications by Scopus author URL
const getPublicationsFromScopus = async (authorUrl) => {
  try {
    const authorId = extractAuthorId(authorUrl);
    if (!authorId) {
      throw new Error('Invalid Scopus URL or authorId not found.');
    }

    // Construct the API URL using the extracted authorId
    const url = `${scopusBaseUrl}?query=AU-ID(${authorId})&apiKey=${apiKey}`;

    // Make the API request
    const response = await axios.get(url, {
      headers: {
        'X-ELS-APIKey': apiKey,
        'Accept': 'application/json',
      },
    });

    // Log the response data
    console.log('Response Data:', response.data);

    // Check if the data directory exists, if not, create it
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Write the fetched data to the JSON file
    fs.writeFileSync(outputFile, JSON.stringify(response.data, null, 2));
    console.log('Data successfully written to', outputFile);

  } catch (error) {
    console.error('Error fetching publications from Scopus:', error.response ? error.response.data : error.message);
  }
};

// Provide the Scopus author URL
const authorUrl = 'https://www.scopus.com/authid/detail.uri?authorId=57211662543'; // Replace with the actual URL

// Fetch and store the publications
getPublicationsFromScopus(authorUrl);

module.exports = getPublicationsFromScopus;