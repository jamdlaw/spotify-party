const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const sql = require('./mysql-utils');

app.get('/testdb', async (req, res) => {
    let foo = await sql.query('SELECT * FROM Users');
    res.send(foo)
})

app.listen(process.env.NODE_PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.NODE_PORT}`);
  });