const keys = requrie("./keys")

const redis = require("redis")
const redisClient = redis.createClient({
    host:keys.redisHost,
    port:keys.redisPort,
    // it tells redis client that if we ever lose connectin to redis server, 
    // it should attempt to automatically reconnect to the server once every second.
    retry_strategy:()=>1000
})

const sub = redisClient.duplicate();

function fib(index){
    if(index<2) return 1
    return fib(index - 1) + fib(index - 2)
}

sub.on('message',(channel,message)=>{
    // hset => hash
    redisClient.hset('values',message,fib(parseInt(message)))
})
sub.subscribe('insert')