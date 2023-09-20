import express from "express";
import EmployeeController from "@lib/controllers/employee";

const router = express.Router();

router.get("/", EmployeeController.getEmployeesPaginated);

router.get("/:employeeId", EmployeeController.getEmployee);

router.post("/", EmployeeController.createEmployee);

router.post("/bulk", EmployeeController.bulkCreateEmployees);

router.put("/", EmployeeController.bulkUpdateEmployees);

router.put("/:employeeId", EmployeeController.updateEmployee);

router.delete("/", EmployeeController.bulkDeleteEmployees);

router.delete("/:employeeId", EmployeeController.deleteEmployee);

export default router;
