const mongoose = require("mongoose")
const Schema = mongoose.Schema
const personSchema = new Schema({
fname: String, 
lname: String,
username :String,
age: { type: Number, min:1, index: true },
gmail: String,
phonenumber:String,
dob : String,
employeenumber:String,
emiridesid :String,
department:String,
designation:String,
addrss: String,
id:String,
newpassword:String
});
const person = mongoose.model('persondata',personSchema)
module.exports = person

