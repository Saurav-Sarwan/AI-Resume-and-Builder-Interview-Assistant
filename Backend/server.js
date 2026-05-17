require("dotenv").config() //through this method we can call all variables present under .env file

const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB()

app.listen(3000, ()=>{
    console.log("Server is running on 3000")
})
