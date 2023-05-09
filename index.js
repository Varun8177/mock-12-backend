const express = require("express")
const cors = require("cors")
const connection = require("./config/db")
const employeeRouter = require("./routes/employee.route")
const userRouter = require("./routes/user.route")
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send({
        message: "homepage"
    })
})

app.use("/emp", employeeRouter)
app.use("/users", userRouter)

app.listen(8080, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server running at post 8080")
})