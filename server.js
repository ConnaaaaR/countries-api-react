/* eslint-env node */
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); 

const app = express();

const PORT = process.env.PORT || 8000; 

const allowedOrigins = ['https://countries-react-app-41e6305a2b31.herokuapp.com', 'localhost:']
app.use(cors({
    origin: function(origin, callback){
        if (!origin) return callback(null,true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'CORS policy for this site does not allow access from the specified origin';
            return callback(new Error(msg), false);
        }
        return callback(null, true)
    }
    

}));

  app.get('/country', async (req, res) => {
    const country = req.query.country;

    // Validate the country input
    if (!country || typeof country !== 'string') {
        return res.status(400).json({ error: 'Invalid country parameter' });
    }

    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
        
        // Check if the response from the external API is valid
        if (response.data && Array.isArray(response.data)) {
            
            console.log(res.json(response.data));
        } else {
            res.status(500).json({ error: 'Invalid data from the external API' });
        }
    } catch (error) {
        res.status(500).json({ error: error.response ? error.response.data : 'An error occurred while fetching country data' });
    }
});
  app.get('/countryFull', async (req, res) => {
    const country = req.query.country;

    // Validate the country input
    if (!country || typeof country !== 'string') {
        return res.status(400).json({ error: 'Invalid country parameter' });
    }

    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
        
        // Check if the response from the external API is valid
        if (response.data && Array.isArray(response.data)) {
            
            console.log(res.json(response.data));
        } else {
            res.status(500).json({ error: 'Invalid data from the external API' });
        }
    } catch (error) {
        res.status(500).json({ error: error.response ? error.response.data : 'An error occurred while fetching country data' });
    }
});

app.get('/api/config', (req,res) => {
    res.json({port: PORT})
})

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/dist'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
}



app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});