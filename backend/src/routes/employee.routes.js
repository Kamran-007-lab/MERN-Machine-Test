import { Router } from "express";
import {
    createEmployee,
    updateAccountDetails,
    getEmployeeProfile,
    getAllEmployees,
} from "../controllers/employee.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


// secured routes
router.route("/createEmployee").post(verifyJWT,upload.single("avatar"), createEmployee);
router.route("/updateAccountDetails/:employeeId").patch(verifyJWT,upload.single("avatar"),updateAccountDetails);
router.route("/getEmployeeProfile/:employeeId").post(verifyJWT, getEmployeeProfile);
router.route("/getAllEmployees").get(verifyJWT,getAllEmployees)


export default router;
