const express = require('express');
const axios = require('axios');
const path = require('path'); // Import path module
const app = express();
const PORT = 3000;


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/fetchJobs', async (req, res) => {
    const { count, scrapeCompany, urls } = req.query;

    try {
        const response = await axios.get(urls[0], {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        });

        res.json({
            count: count,
            scrapeCompany: scrapeCompany,
            jobs: response.data
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching job listings: ' + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
