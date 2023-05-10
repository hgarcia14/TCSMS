const express = require('express');
const cors = require('cors');

const app = express();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/subscription', require('./src/routes/subscription'));

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });