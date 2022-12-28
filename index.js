const mongoose = require("mongoose");
const app = require("./app");
const DB_URL = "mongodb+srv://root:root123@cluster0.hzhvoqr.mongodb.net/Blogg?retryWrites=true&w=majority";
const port = 5000;

mongoose.set('strictQuery', false)
async function main(){
await mongoose.connect(DB_URL)
console.log("Connected to DB")
app.listen(port ,()=>{console.log("server is running on port"+port)})
}

main();