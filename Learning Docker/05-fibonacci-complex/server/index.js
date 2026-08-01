const keys = require("./keys")

// express app setup
const express = require("expres")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(bodyParser.json())

// postgres client setup
const {Pool} = require('pg')
const pgClient =  new Pool({
    user: keys.pgUser,
    host:keys.pgHost,
    port:keys.pgPort,
    database:keys.pgDatabase,
    password:keys.pgPassword
})
pgClient.on('error',()=>{console.log("Lost PG connection")})

pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')
.catch(err =>console.log(err))


// Redis client setup
const redis = require("redis")

const redisClient = redis.createClient({
    host:keys.redisHost,
    port:keys.redisPort,
     // it tells redis client that if we ever lose connectin to redis server, 
    // it should attempt to automatically reconnect to the server once every second.
    retry_strategy:()=>1000
})
const redisPublisher = redisClient.duplicate();

// Express route handlers

app.get('/',(req,res)=>{
    res.send("Hi")
})

app.get('/values/all',async(req,res)=>{
    const values = await pgClient.query("SELECT * from values");
    res.send(values.rows)
})

app.get('/values/current',async(req,res)=>{
    // look at a hash value inside redis instance an dget all info from it. 
    await redisClient.hgetall('values',(err,values)=>{res.send(values)})
})

app.post('/values',async(req,res)=>{
    const index = req.body.index
    // calculating a fibonacci number with this method in our worker process for a large index will take a lot of time
    if(parseInt(index) > 40){
        return res.status(422).send('Index is too high')
    }

    redisClient.hset('values',index, "Nothing yet!")
    redisPublisher.publish('insert',index)
    // take the submitted index and permanently store it in pg
    pgClient.query('INSERT INTO values(number) VALUES($1)',[index])

    res.send({working:true})
})

app.listen(5000, err =>{
    console.log("Listening")
})