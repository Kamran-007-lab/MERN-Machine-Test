import { Router } from "express";
import {
    createEmployee,
    updateAccountDetails,
    getEmployeeProfile,
    getAllEmployees,
    toggleEmployee,
    deleteEmployee,
} from "../controllers/employee.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


// secured routes
router.route("/createEmployee").post(verifyJWT,upload.single("avatar"), createEmployee);
router.route("/updateAccountDetails/:employeeId").patch(verifyJWT,upload.single("avatar"),updateAccountDetails);
router.route("/getEmployeeProfile/:employeeId").get(verifyJWT, getEmployeeProfile);
router.route("/getAllEmployees").get(verifyJWT,getAllEmployees);
router.route("/toggleEmployee/:employeeId").post(verifyJWT,toggleEmployee);
router.route("/deleteEmployee/:employeeId").delete(verifyJWT,deleteEmployee);


export default router;
