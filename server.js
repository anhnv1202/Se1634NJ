import express from "express";
import { connect } from "mongoose"; //2
import * as dotenv from 'dotenv'
import {userRouter, productRouter} from "./routes/index.js";
// import { create } from "./models/productModel"; //2
dotenv.config()
const app = express();
app.use(express.json()) // COnfig cho express lam viec vs dlieu dang Json

//Routes: GET,POST,PUT (PATCH),
app.get("/", (req, res) => {
  res.send("Welcome to Home RESTful API ");
});

app.use('/users',userRouter)
app.use('/product',productRouter)

const port = process.env.PORT || 8080;

connect(
  process.env.MONGO_URI
)
  .then(() => {
    console.log("Connect to MongoDB successfully");
    app.listen(port, () => {
      console.log("Server is running at port 9999");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

// app.post("/products",async (req,res)=>{
//     try {
//         const product = await Product.create(req.body)
//         if(!product) {
//             res.status(500).json({message:'Cannot create product.'})
//         }
//         res.status(200).json(product)
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// app.get('/',(req,res)=>{
//     res.status(200).json({message:'Hello world'})
// })

// app.get("/products",(req,res)=>{
//     try {
//         const data = [
//             {id: 1, name: "Tom", age: 20},
//             {id: 2, name: "Mary", age: 19}
//         ]
//         res.status(200).json({data})
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })

// app.get("/blogs",(req,res)=>{
//     res.send("Welcome to Blogs")
// })

//Listen on port number: 9999

//Connect to mongoDB
