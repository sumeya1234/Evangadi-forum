require("dotenv").config()
const express = require("express");
const app = express();
const port = 3030;
const dbConnection = require("./DB/dbConfig");  // DB connection


// User routes middleware file
const userRoutes = require("./Routes/userRoute");
const questionRoutes = require("./Routes/questionRoute");
const answerRoutes = require("./Routes/answerRoute");
// JSON middleware to extract json data
app.use(express.json());

// User route middleware
app.use("/api/users", userRoutes);

// Questions route middleware
app.use("/api/question", questionRoutes)

// Answers route middleware
app.use("/api/answer", answerRoutes);

async function start(){
    try {
        const result = dbConnection.execute("select 'test' ");
        await app.listen(port)
        console.log("Database connection established")
        console.log(`listening on ${port}`)
    } catch (error) {
        console.log(err)
    }
}
start()