const express=require('express');
const app=express();
const port=4000;

const user=require('./routes/user.js')
const car=require('./routes/car')

app.use(express.json())
app.use('/user',user)
app.use('/car',car)

app.get('/',(req,res)=>{
    console.log("get request has come")
    res.send('hello express')
})

app.listen(port,()=>{
    console.log(`app staring on ${port}`)
})