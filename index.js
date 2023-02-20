const express = require("express");
const { connection } = require("./Config/db");
require("dotenv").config();
const { authentication } = require("./Middleware/Authenticate.middleware");
const { PostRouter } = require("./Routes/Post.routes");
const { UserRouter } = require("./Routes/User.routes");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

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

