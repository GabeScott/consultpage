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

async function getAllConsults(){
  const pool = getPool();

  let retval = await pool.query("SELECT facility, first_name, last_name, consult_type, call_back_phone, referring_provider, time_created, patient_location, date_of_birth, gender, camera_name, notes, open FROM consults;")
  await pool.end();

  return retval.rows;
}

async function getAllOpenConsults(){
  const pool = getPool();

  let retval = await pool.query("SELECT facility, first_name, last_name, consult_type, call_back_phone, referring_provider, time_created, patient_location, date_of_birth, gender, camera_name, notes, open FROM consults WHERE open='true';")
  await pool.end();

  return retval.rows;
}

async function createEmptyConsult(time_created){
  const pool = getPool();

  let retval = await pool.query(`INSERT INTO consults (time_created, open) VALUES (TIMESTAMP(0) '${time_created}', 'true');`)
  await pool.end();
  return "New Consult Successfully Inserted";
}

async function updateConsult(request){
  const pool = getPool();

  const f   = request.facility ? `'${request.facility}'` : "''";
  const ln  = request.last_name ? `'${request.last_name}'` : "''";
  const fn  = request.first_name ? `'${request.first_name}'` : "''";
  const ct  = request.consult_type ? `'${request.consult_type}'` : "''";
  const cbp = request.call_back_phone ? `'${request.call_back_phone}'` : "''";
  const rp  = request.referring_provider ? `'${request.referring_provider}'` : "''";
  const tc  = request.time_created ? `'${request.time_created}'` : "''";
  const pl  = request.patient_location ? `'${request.patient_location}'` : "''";
  const db  = request.date_of_birth ? `'${request.date_of_birth}'` : "null";
  const g   = request.gender ? `'${request.gender}'` : "''";
  const cn  = request.camera_name ? `'${request.camera_name}'` : "''";
  const n   = request.notes ? `'${request.notes}'` : "''";

  console.log(request);

  var query = "UPDATE consults SET (facility, first_name, last_name, consult_type, call_back_phone, referring_provider, patient_location, date_of_birth, gender, camera_name, notes)"
  query += ` = (${f},${fn},${ln},${ct},${cbp},${rp},${pl},${db},${g},${cn},${n}) WHERE time_created= timestamp ${tc};`

  let retval = await pool.query(query);
  await pool.end();
  return "Consult Successfully Updated";
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
    } else {
      retval = "Action not understood";
    }

    console.log(retval);
    res.end(JSON.stringify(retval));
  });

});
app.use(express.static('./consultpage/build/'));
app.listen(80);
