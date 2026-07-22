const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const connection = mysql.createConnection(config);

connection.query(`CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`);

const name = 'Vinícius';
const sql_insert = `INSERT INTO people(name) values(?)`;

app.get('/', (req,res) => {

    connection.query(sql_insert, name);
    connection.query('SELECT name FROM people', (err, results) =>  {
        if(err) {
            console.log('Error searching database');
            return;
        }
        let html_response = '<h1>Full Cycle Rocks!!</h1>';
        html_response += '<ul>';
        results.forEach(element => {
            html_response += `<li>${element.name}</li>`;
        });
        html_response += '</ul>';

        res.send(html_response);
    });    
});

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})