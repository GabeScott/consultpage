const { exec } = require("child_process");
var http = require("http");
var url = require("url");
const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool({
  user:'power_user',
  host:'localhost',
  database:'postgres',
  password:'Jordan.23',
  port:5432,
})
//pool.query('SELECT NOW()', (err, res) => {
//  console.log(err, res)
//  pool.end()
//})
function addConsult(consult){

}
function updateConsult(consult){

}
function getConsult(date){

}
http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(JSON.parse(body).notes);
  });
  response.end("RECEIVED " + body);
}).listen(8080); // Activates this server, listening on port 8080.