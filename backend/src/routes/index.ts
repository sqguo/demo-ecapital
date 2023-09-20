import express from "express";
import EmployeeRoutes from "./employee";

const routes = express.Router();

routes.use("/employee", EmployeeRoutes);

export default routes;
