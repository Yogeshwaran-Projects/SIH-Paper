const axios = require('axios');


const apiKey = 'a8a4d857bb32b09cde009e2ce4d37398694ba088'; // Replace with your actual API key



const wossearch = async (queryString)=> {
  try {
    const url = 'http://api.clarivate.com/apis/wos-starter/v1/documents';
    // console.log('Request URL:', url);

    const response = await axios.get(url, {
      headers: {
        'X-ApiKey': apiKey,
        'Accept': 'application/json',
      },
      params: {
        q: `TS="${queryString}"`,
        db: 'WOS',
        page: 1, // Only fetch the first page
        limit: 5, // Adjust the limit as needed
      },
    });

    const data = response.data;
    const papers = data.hits;

    console.log('Papers Retrieved:', papers.length);

    return papers;

  } catch (error) {
    console.error('Error fetching papers:', error.response ? error.response.data : error.message);
    throw error; // Re-throw error to be handled by caller
  }
};

module.exports = wossearch;
