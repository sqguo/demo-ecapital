import express from "express";
import EmployeeController from "@lib/controllers/employee";

const router = express.Router();

router.get("/", EmployeeController.getEmployeesPaginated);

router.post("/", EmployeeController.createEmployee);

router.post("/bulk", EmployeeController.bulkCreateEmployee);

router.get("/:employeeId", EmployeeController.getEmployee);

router.put("/:employeeId", EmployeeController.updateEmployee);

router.delete("/:employeeId", EmployeeController.getEmployee);

export default router;
