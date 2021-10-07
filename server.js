const proxy = require('express-http-proxy');
const express = require('express');
const cors = require('cors');
const app = express(); 

const { Pool, Client } = require('pg')

function getPool(){
  const pool = new Pool({
    user:'power_user',
    host:'localhost',
    database:'consult_db',
    password:'Jordan.23',
    port:5432,
  });
  return pool;
}

function generateUpdateSQL(consult){
  var consult_temp = {...consult};
  delete consult_temp['time_created'];
  delete consult_temp['open']
  delete consult_temp['action']

  var values = [];

  var sql = 'UPDATE consults SET ';
  const keys = Object.keys(consult_temp);

  if(keys.length > 1){
    sql += '('
    keys.slice(0,-1).forEach(key => sql+=key+',')
  }
  sql += keys[keys.length-1];

  

  var index = 1;
  if(keys.length > 1){
    sql += ') = ('
    keys.slice(0,-1).forEach(key => sql+='$'+(index++)+',')
  } else {
    sql += '='
  }
  sql+='$' + (index++)+' '

  if(keys.length > 1){
    sql += ') '
  }

  keys.slice().forEach(key=>values.push(consult_temp[key] || null))

  return [sql, values];
}

async function getAllConsults(){
  const pool = getPool();

  let retval = await pool.query("SELECT * FROM consults ORDER BY time_created;")
  await pool.end();

  return retval.rows;
}

async function getAllOpenConsults(){
  const pool = getPool();

  let retval = await pool.query("SELECT * FROM consults WHERE open='true' ORDER BY time_created;")
  await pool.end();

  return retval.rows;
}

async function createEmptyConsult(time_created){
  const pool = getPool();
  var now = new Date().toISOString();

  let retval = await pool.query(`INSERT INTO consults (time_created, consult_time, nihss_time) VALUES ($1, $2, $3) RETURNING *;`, [time_created, now, now])
  await pool.end();
  return retval.rows[0];
}

async function updateConsult(request){

  const pool = getPool();

  var [sql, values] = generateUpdateSQL(request);
  sql += 'WHERE time_created= $'+(values.length+1)+';';
  values.push(request.time_created);

  console.log(sql);

  let retval = await pool.query(sql, values);
  await pool.end();
  return "Consult Successfully Updated";
}

async function closeConsult(request){
  const pool = getPool();
  const tc  = request.time_created || '';

  const query = "UPDATE consults SET open='false' WHERE time_created= $1;"

  let retval = await pool.query(query, [tc]);
  await pool.end();
  return "Consult Successfully Closed";
}

app.use(cors());

app.post('/api', async function(req, res){
  const { headers, method, url } = req;
  let request;
  let body = [];
  req.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async function() {
    body = Buffer.concat(body).toString();
    request = JSON.parse(body);

    let retval;
    // console.log(request);

    if(request.action === 'createEmptyConsult'){
      retval = await createEmptyConsult(request.time_created);
    } else if (request.action === 'getAllConsults'){
      retval = await getAllConsults();
    } else if (request.action === 'getAllOpenConsults'){
      retval = await getAllOpenConsults();
    } else if (request.action === 'updateConsult'){
      retval = await updateConsult(request);
    } else if (request.action === 'closeConsult'){
      retval = await closeConsult(request);
    } else {
      retval = "Action not understood";
    }

    res.end(JSON.stringify(retval));
  });

});
app.use(express.static('./consultpage/build/'));
app.listen(80);

