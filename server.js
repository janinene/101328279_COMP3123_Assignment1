const express = require("express")
const mongoose  = require("mongoose")
const userRoute = require("./routes/user_route")
const employRoute = require("./routes/employee_route")


const app = express()

const SERVER_PORT = 8080

app.use(express.json())
app.use(express.urlencoded())

const DB_CONNECTION_STRING = "mongodb+srv://janineusana:mongodbjanine@cluster0.37gpaqg.mongodb.net/Assignment1_FullStack?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
    

app.use("/api/", userRoute)
app.use("/api/emp/", employRoute)

app.route("/")
    .get((req, res) => {
        res.send("<h1>Assignment 1</h1> <br> <h2>Stu: Janine</h2>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})