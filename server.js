const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
    connectionString: 'postgres://igyybysn:pmLFV4zvjZLUStFtQosVXj68ckc82DHH@berry.db.elephantsql.com/igyybysn',
});
client.connect();

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
        res.status(400).send('Username already exists');
    } else {
        await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
        res.status(201).send('User created');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length > 0) {
        res.send('Login successful');
    } else {
        res.status(400).send('Invalid username or password');
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running at port 5000`);
});