const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://varun:1234jklm@cluster0.ay3zbos.mongodb.net/employee-management?retryWrites=true&w=majority")

module.exports = connection