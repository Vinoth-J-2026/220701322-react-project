const express = require('express');
const morgan = require('morgan');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended: true}));

const db=new pg.Client({
    host: "localhost",
    port:5432,
    user:"postgres",
    password:"root",
    database:"test"
})
db.connect().then(()=>{    
    console.log("database connected");
})
app.post('/add',async(req,res)=>{
    const data=req.body;
    await db.query("INSERT INTO table(desc,mode,amount) VALUES ($1,$2,$3)",[data.desc,data.mode,data.amount]);
    res.status(201).send("Record Inserted");
    })
app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.listen(3001,() => {
    console.log('Server is running on port 3001');
});
