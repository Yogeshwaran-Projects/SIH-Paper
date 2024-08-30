const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../data/");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const scrapeGoogleScholarProfile = async (profileUrl) => {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to profile URL
    await page.goto(profileUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector(".gsc_a_tr");

    // Click "Show more" button until it's disabled
    let loadMoreVisible = true;
    while (loadMoreVisible) {
      loadMoreVisible = await page.evaluate(() => {
        const loadMoreButton = document.querySelector("#gsc_bpf_more");
        if (loadMoreButton && !loadMoreButton.disabled) {
          loadMoreButton.click();
          return true;
        }
        return false;
      });
      if (loadMoreVisible) {
        await sleep(2000);
      }
    }

    // Extract publication links
    const publicationLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".gsc_a_tr .gsc_a_at"))
        .map(link => link.href)
        .filter(href => href);
    });

    console.log("Publication links collected:", publicationLinks);

    const detailedPublications = [];

    for (const link of publicationLinks) {
      // Ensure the link is a complete URL
      const fullLink = link.startsWith("http") ? link : `https://scholar.google.com${link}`;

      await page.goto(fullLink, { waitUntil: 'networkidle2' });
      await page.waitForSelector("#gsc_oci_title");

      // Extract detailed publication data
      const publicationDetails = await page.evaluate(() => {
        const normalizeKey = (key) => {
          // Replace spaces with underscores and make sure key is in lower case
          return key.replace(/\s+/g, '_').toLowerCase();
        };

        const details = {};
        const fields = document.querySelectorAll(".gsc_oci_field");

        fields.forEach((field) => {
          const key = normalizeKey(field.textContent.trim());
          const valueElement = field.nextElementSibling;
          if (key === 'total_citations' && valueElement) {
            const citedByElement = valueElement.querySelector('a');
            if (citedByElement) {
              details[key] = citedByElement.textContent.replace('Cited by ', '').trim();
            }
          } else {
            const value = valueElement?.textContent.trim() || null;
            details[key] = value;
          }
        });

        const titleElement = document.querySelector(".gsc_oci_title_link");
        if (titleElement) {
          details.title = titleElement.textContent.trim();
          details.href = titleElement.href;
        }

        return details;
      });

      publicationDetails.link = fullLink;  // Add the full link to the details
      detailedPublications.push(publicationDetails);
      console.log("Scraped detailed publication:", publicationDetails);
    }

    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Write data to file
    fs.writeFileSync(
      path.join(dataDir, "googleScholarDetailedData.json"),
      JSON.stringify(detailedPublications, null, 2)
    );
    console.log("Successfully written detailed data to file");

  } catch (error) {
    console.error("Error during scraping:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = scrapeGoogleScholarProfile;
