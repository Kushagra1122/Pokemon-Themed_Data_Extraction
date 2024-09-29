// server.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
;

const app = express();
const PORT = 3000;

const cors = require("cors")


app.use(cors())


const companies = {
    "Voltas": "VOLTAS",
    "Blue Star": "BLUESTARCO",
    "Crompton": "CROMPTON",
    "Orient Electric": "ORIENTELEC",
    "Havells": "HAVELLS",
    "Symphony": "SYMPHONY",
    "Whirlpool": "WHIRLPOOL"
};

app.get('/api/stats', async (req, res) => {
    const companyStats = {};

    for (const [company, code] of Object.entries(companies)) {
        const url = `https://www.screener.in/company/${code}`;
        console.log(url)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            // Extract stats
            companyStats[company] = {
                "Market Cap": $('span:contains("Market Cap")').next().text().trim(),
                "Stock P/E": $('span:contains("Stock P/E")').next().text().trim(),
                "ROCE": $('span:contains("ROCE")').next().text().trim(),
                "Current Price": $('span:contains("Current Price")').next().text().trim(),
                "ROE": $('span:contains("ROE")').next().text().trim()
            };
        } catch (error) {
            console.error(`Failed to retrieve data for ${company}:`, error.message);
        }
    }

    res.json(companyStats);
});
const fetchBalanceSheetData = async (slug) => {
    const url = `https://www.screener.in/company/${slug}/`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(url)
   
    const inventoryData = {
        reserves: $('td:contains("Reserves")').next().text().trim() || 'N/A',
        borrowings: $('td:contains("Borrowings")').next().text().trim() || 'N/A',
        totalLiabilities: $('td:contains("Total Liabilities")').next().text().trim() || 'N/A',
        fixedAssets: $('td:contains("Fixed Assets")').next().text().trim() || 'N/A',
        investments: $('td:contains("Investments")').next().text().trim() || 'N/A',
        totalAssets: $('td:contains("Total Assets")').next().text().trim() || 'N/A',
    };

    return inventoryData;
};

// API route to fetch Item Inventory
app.get('/api/pokemon-inventory', async (req, res) => {
    const results = {};

    for (const [company, code] of Object.entries(companies)) {
        try {
           
            results[company] = await fetchBalanceSheetData(code);
        } catch (error) {
            results[company] = { error: 'Data not found' };
        }
    }

    res.json(results);
});
const fetchBattlePerformance = async (slug) => {
    const url = `https://www.screener.in/company/${slug}/`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const performanceData = {
        'March 2022': {},
        'March 2023': {},
        'March 2024': {},
    };

    const metrics = ['Sales', 'Net Profit', 'OPM', 'EPS' ];

    // Loop through each metric
    for (const metric of metrics) {
        // Select the row for the current metric
        const metricRow = $(`tr:contains("${metric}")`);

        if (metricRow.length) {
            const cells = metricRow.find('td');

            // Check and extract data for March 2022, 2023, and 2024
            performanceData['March 2022'][metric] = cells.eq(3).text().trim() || 'N/A'; // Mar 2022
            performanceData['March 2023'][metric] = cells.eq(8).text().trim() || 'N/A'; // Mar 2023
            performanceData['March 2024'][metric] = cells.eq(12).text().trim() || 'N/A'; // Mar 2024
        } else {
            console.warn(`Row for ${metric} not found for URL: ${url}`);
            performanceData['March 2022'][metric] = 'N/A';
            performanceData['March 2023'][metric] = 'N/A';
            performanceData['March 2024'][metric] = 'N/A';
        }
    }
    console.log(performanceData)
    return performanceData;
   

};

// Endpoint for Battle Performance
app.get('/api/pokemon-performance', async (req, res) => {
    const results = {};

    for (const [company, code] of Object.entries(companies)) {
        try {
            results[company] = await fetchBattlePerformance(code);
        } catch (error) {
            console.error(`Error fetching data for ${company.name}:`, error.message);
            results[company] = { error: 'Data not found' };
        }
    }

    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
