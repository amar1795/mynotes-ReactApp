const mongoose=require('mongoose');
// const mongoURI="mongodb://localhost:27017";

const connectToMongo=()=>{

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0');
    console.log("connected to mongoose Successfully!")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

}

module.exports=connectToMongo