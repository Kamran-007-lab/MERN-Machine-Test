import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
// var bodyParser = require('body-parser');

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//Middleware Configuration for accepting data via JSON or URL
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//routes import
import userRouter from "./routes/user.routes.js"
import employeeRouter from "./routes/employee.routes.js"


//routes declaraton
app.use("/api/v1/users",userRouter)
app.use("/api/v1/employees",employeeRouter);




export default app