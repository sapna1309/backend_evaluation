const express = require("express");
const cors = require("cors");
const { connection } = require("./Config/db");
require("dotenv").config();
const { authentication } = require("./Middleware/Authenticate.middleware");
const { PostRouter } = require("./Routes/Post.routes");
const { UserRouter } = require("./Routes/User.routes");


const app = express();

app.use(express.json());

app.use(cors());

app.get("/",(req,res)=>{
  res.send("This is Home Page for Checking url")
})

app.use("/users",UserRouter);

app.use("/posts",authentication,PostRouter);

app.listen(process.env.port,async()=>{
    try {
     await connection;
      console.log("Conneted to database successfully");   
    } catch (error) {
      console.log(error);  
    }
    console.log(`Server running at port ${process.env.port}`);
})

