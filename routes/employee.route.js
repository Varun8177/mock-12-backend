const express = require("express")
const EmployeeModel = require("../models/employee.model")
const employeeRouter = express.Router()


employeeRouter.get("/", async (req, res) => {
    const query = req.query;
    const departmentQuery = {};
    const sortQuery = {};
    const paginationQuery = {};
    const page = +query.page || 1;
    const limit = +query.limit || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (query.d) {
        departmentQuery.department = query.d;
    }

    if (query.sort) {
        if (query.sort === "asc") {
            sortQuery.salary = 1;
        } else if (query.sort === "desc") {
            sortQuery.salary = -1;
        }
    }

    if (page && limit) {
        paginationQuery.skip = startIndex;
        paginationQuery.limit = limit;
    }

    try {
        const employees = await EmployeeModel.find({ $and: [departmentQuery] })
            .sort(sortQuery)
            .skip(startIndex)
            .limit(limit);
        const count = await EmployeeModel.countDocuments({ $and: [departmentQuery] });
        const totalPages = Math.ceil(count / limit);

        const response = {
            data: employees,
            page,
            totalPages,
            totalResults: count,
        };

        res.send(response);
    } catch (error) {
        res.send({
            message: error.message,
        });
    }
});


employeeRouter.post("/", async (req, res) => {
    try {
        const newEmp = new EmployeeModel(req.body)
        await newEmp.save()
        res.send(newEmp)
    } catch (error) {
        res.send({
            message: error.message
        })
    }
})

employeeRouter.patch("/:id", async (req, res) => {
    const id = req.params.id
    const changes = req.body
    try {
        const newEmp = await EmployeeModel.findByIdAndUpdate({ _id: id }, changes)
        res.send(newEmp)
    } catch (error) {
        res.send({
            message: error.message
        })
    }
})

employeeRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const newEmp = await EmployeeModel.findByIdAndDelete({ _id: id })
        res.send(newEmp)
    } catch (error) {
        res.send({
            message: error.message
        })
    }
})

module.exports = employeeRouter