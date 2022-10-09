const express=require('express');
const app=express();
const port=4000;

const customer=require('./routes/customer.js')
const item=require('./routes/item')
const order=require('./routes/orders')
const orderDetails=require('./routes/orderDetails')

app.use(express.json())
app.use('/customer',customer)
app.use('/item',item)
app.use('/order',order)
app.use('/orderDetails',orderDetails)

app.get('/',(req,res)=>{
    console.log("get request has come")
    res.send('hello express')
})

app.listen(port,()=>{
    console.log(`app staring on ${port}`)
})