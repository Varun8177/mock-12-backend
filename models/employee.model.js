const mongoose = require("mongoose")

const EmployeeSchema = mongoose.Schema({
    "first_name": String,
    "last_name": String,
    "email": String,
    "department": String,
    "salary": Number
})

const EmployeeModel = mongoose.model("employee", EmployeeSchema)

module.exports = EmployeeModel