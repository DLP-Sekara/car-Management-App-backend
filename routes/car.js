const express=require('express');
const router=express.Router();

const db=require('../config/db.config')
const mysql = require('mysql')
const connection = mysql.createConnection(db.database);
connection.connect(function (err) {
    if(err){
        console.log(err.message)
    }else{
        console.log("connected to the mysql server")
        var userTable="CREATE TABLE IF NOT EXISTS car (carNo varchar(255) PRIMARY KEY,brand varchar(255),model varchar(255),color varchar(255),price double )"
        connection.query(userTable,function (err, result) {
            if(err) throw err;
            if(result.warningCount===0){
                console.log("car table crated");
            }

        })
    }
})

//get all
router.get('/',(req,res)=>{
    var query="SELECT * FROM car";
    connection.query(query,(err,rows)=>{
        if(err) throw  err;
        res.send(rows)
    })
})

//save
router.post('/',(req,res)=>{
    const carNo=req.body.carNo;
    const brand=req.body.brand;
    const model=req.body.model;
    const color=req.body.color;
    const price=req.body.price;

    var query="INSERT INTO car (carNo,brand,model,color,price) VALUES (?,?,?,?,?)";
    connection.query(query,[carNo,brand,model,color,price],(err)=>{
        if(err){
            res.send({"message":"Error"})
            //throw err;
        }else{
            res.send({"message":"car added"})
        }
    })
})

//update
router.put('/',(req,res)=>{
    const carNo=req.body.carNo;
    const brand=req.body.brand;
    const model=req.body.model;
    const color=req.body.color;
    const price=req.body.price;
    var query="UPDATE car SET carNo=?,brand=?,model=?,color=?,price=? WHERE carNo=?";
    connection.query(query,[carNo,brand,model,color,price],(err,rows)=>{
        if(err){
            throw err;
        }else{
            if(rows.affectedRows>0 ){
                res.send({"message": "car updated"});
            }else{
                res.send({"message":"car not found"})
            }
        }
    })
    console.log(req.body)
})

//delete
router.delete('/:carNo',(req,res)=>{
    const carNo=req.params.carNo;
    var query="DELETE FROM car WHERE carNo=?"
    connection.query(query,[carNo],(err,rows)=>{
        if(err) console.log(err)
        if(rows.affectedRows>0){
            res.send({"message":"car deleted"})
        }else{
            res.send({"message":"car not found"})
        }
    })
})

//search
router.get('/:carNo',(req,res)=>{
    const carNo=req.params.carNo;
    var query="SELECT * FROM car WHERE carNo=?"
    connection.query(query,[carNo],(err,rows)=>{
        if(err) console.log(err)
        res.send(rows)
    })
})

module.exports=router