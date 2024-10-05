import { Router } from "express";
import {
    createEmployee,
    updateAccountDetails,
    getEmployeeProfile,
} from "../controllers/employee.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


// secured routes
router.route("/createEmployee").post(verifyJWT, createEmployee);
router.route("/updateAccountDetails/:employeeId").patch(verifyJWT,upload.single("avatar"),updateAccountDetails);
router.route("/getEmployeeProfile/:employeeId").post(verifyJWT, getEmployeeProfile);


export default router;
