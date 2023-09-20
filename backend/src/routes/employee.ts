import express from "express";
import EmployeeController from "@lib/controllers/employee";

const router = express.Router();

router.get("/", EmployeeController.get);

export default router;
