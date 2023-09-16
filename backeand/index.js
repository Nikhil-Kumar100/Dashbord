const express = require('express');
require("./db/config");
const cors = require('cors');
const users = require("./db/user");
const Product = require('./db/product');
const Jwt = require('jsonwebtoken');
const JweKey = "e-comm";

const app = express();
app.use(cors());


app.use(express.json());
app.post('/register', async (req,res)=>{
    let user = new users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    if(result){
      Jwt.sign({result},JweKey,{expiresIn:"5h"},(err,token)=>{
        if(err){
          res.send({ errors: 'Somthing wont Rong pls Try after somtime' });
        }else{
          res.send({result,auth:token});
        }
      })
    }
   
});

app.post('/login', async (req, res) => {
    console.warn("login....")
    
    if (req.body.password && req.body.email) {
     let user = await users.findOne(req.body).select("-password");
     if (user) {
      Jwt.sign({user},JweKey,{expiresIn:"5h"},(err,token)=>{
        if(err){
          res.send({ result: 'Somthing wont Rong pls Try after somtime' });
        }else{
          res.send({user,auth:token});
        }
      })
        
     } else {
         res.send({ result: 'No user Found' });
     }
    } else {
         res.send({ result: 'No user Found' });
    }
 });

 app.post('/add-product',verifyToken, async (req,res)=>{
    let product =new Product(req.body);
    let result = await product.save();
    res.send(result);
 });

 app.get('/products',verifyToken,async(req,res)=>{
    let products=await Product.find();
    if(products.length>0){
        res.send(products);
       
    }else{
        res.send({result:"Product Not Found"});
    }
 })

 app.delete('/productdel/:id',verifyToken, async (req, res) => {
    try {
      const result = await Product.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 1) {
        // Product was successfully deleted
        res.status(200).json({ message: 'Product deleted successfully' });
      } else {
        // No product found with the given ID
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      // Handle any server/database errors
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.get('/product/:id',verifyToken,async (req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
       
    }else{
        res.send({result:"Product Not Found"});
    }
  });
  app.put('/product/:id',verifyToken, async (req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
        
    )
    res.send(result);
  });
  
  app.get("/search/:key",verifyToken, async (req, res) => {
    try {
      const result = await Product.find({
        "$or": [
          { name: { $regex: req.params.key, $options: 'i' } },
          { price: { $regex: req.params.key, $options: 'i' } },
          { category: { $regex: req.params.key, $options: 'i' } },
          { company: { $regex: req.params.key, $options: 'i' } } // Case-insensitive search
        ]
      });
  
      res.json(result);
    } catch (error) {
      console.error('Error searching for products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  function verifyToken(req,res,next){
    let token = req.headers['authorization'];
   if(token){
    token=token.split(' ')[1];
    Jwt.verify(token,JweKey,(err,valid)=>{
      if(err){
        res.status(401).send({result:"Pls Provide Valid Token"});
      }else{
        next();
      }
    })
   }else{
    res.status(403).send({result:"Pls Provide Valid Token with Hader"});
   }
  }

app.listen(5000);