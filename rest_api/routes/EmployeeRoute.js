import express from "express";
import {
    getemployee, 
    getemployeeById,
    create_employee,
    update_employee,
    delete_employee
} from "../controllers/employeeController.js";

const router = express.Router();

router.get('/employee', getemployee);
router.get('/employee/:id', getemployeeById);
router.post('/employee', create_employee);
router.put('/employee/:id', update_employee);
router.delete('/employee/:id', delete_employee);

export default router;